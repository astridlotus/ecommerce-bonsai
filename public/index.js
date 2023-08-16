/**
 * Name: Astrid Bowden and Anna Sun
 * Date: 06.02.2023
 * Section: CSE 154 AB
 *
 * This is the index.js page for our ecommerce site: Bonsai & I. it includes all of the
 * functionality mainly populating the main page, item page and user page. It also allows
 * the user to create an account, leave a review or purchase an item.
 */

"use strict";

(function () {
  window.addEventListener("load", init);

  /**
   * This function loads the page when the window is open and adds any event
   * listeners as needed
   */
  function init() {
    if (localStorage.getItem("logged in") === "true") {
      setLoggedIn(true);
    }
    disableLogButtons();
    reviewButtons();
    navButtonEvents();
    populateHomeItems();
    addSortEvents();
    accountPageEvent();
    loginEvents();
  }

  /**
   * adds all necessary functions to elements regarding sorting/filtering
   */
  function addSortEvents() {
    const types = document.querySelectorAll("#filter input");
    for (let i = 0; i < types.length; i++) {
      types[i].addEventListener("click", filterType);
    }

    const filters = document.querySelectorAll("select");
    for (let i = 0; i < filters.length; i++) {
      filters[i].addEventListener("change", filterItems);
    }
  }

  /**
   * enables/disables sorting
   */
  function filterType() {
    toggleSort(this);
    if (this.checked) {
      filterItems();
    } else {
      let items = document.querySelectorAll("#item-container div");
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("hidden");
      }
    }
  }

  /**
   * allows only one filter to be selected at a time
   * @param {HTMLInputElement} sortType - sort type that has been checked/unchecked
   */
  function toggleSort(sortType) {
    const types = document.querySelectorAll("#filter input");
    if (sortType.checked) {
      filterItems(sortType.id);
      for (let i = 0; i < types.length; i++) {
        types[i].disabled = true;
      }
      sortType.disabled = false;
    } else {
      for (let i = 0; i < types.length; i++) {
        types[i].disabled = false;
      }
    }
  }

  /**
   * makes an api call to get all items that match the sort/filter
   */
  async function filterItems() {
    let sortType = document.querySelector("#filter input:checked");
    if (sortType) {
      sortType = sortType.id;
      const filter = document.getElementById(sortType + "-options").value;
      if (filter !== "N/A") {
        try {
          let res = await fetch("/sort/" + sortType + "/" + filter);
          await statusCheck(res);
          let data = await res.json();
          handleFilter(data);
        } catch (err) {
          handleError();
        }
      }
    }
  }

  /**
   * displays only items that match the sort/filter
   * @param {any} data - list of all item ids that match the filter
   */
  function handleFilter(data) {
    let items = document.querySelectorAll("#item-container div");
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add("hidden");
    }
    for (let i = 0; i < data.length; i++) {
      let itemId = data[i].item_id;
      document.getElementById(itemId).classList.remove("hidden");
    }
  }

  /**
   * This function makes a review for an item depending on the user. if they
   * already left a review, a message will show
   * @param {String} parent id
   */
  async function makeReview(parent) {
    let item = parent.id;
    let id = item.match(/\d+/)[0];
    let isReviewer = await checkReview(id);

    if (isReviewer) {
      document.getElementById("leave-review").classList.add("hidden");
      let msg = document.getElementById("variable-msg");
      msg.textContent = "You've already left a review for this item!";
      document.getElementById("variable-msg").classList.remove("hidden");
    } else {
      let submitReview = document.querySelector("#review-form button");

      if (submitReview.clickListener) {
        submitReview.removeEventListener("click", submitReview.clickListener);
      }

      submitReview.clickListener = (event) => {
        event.preventDefault();
        createReview(id);
      };
      submitReview.addEventListener("click", submitReview.clickListener);
    }
  }

  /**
   * This function creates a POST request to add a new review to an item
   * @param {String} itemId id of Item
   */
  async function createReview(itemId) {
    let username = localStorage.getItem("username");
    let response = document.getElementById("review-text").value;
    let rating = document.getElementById("rating").value;
    try {
      let params = new FormData();
      params.append("item_id", itemId);
      params.append("username", username);
      params.append("response", response);
      params.append("rating", rating);
      let res = await fetch("/reviews/create", {
        method: "POST",
        body: params,
      });
      await statusCheck(res);
      document.getElementById("leave-review").classList.add("hidden");
      let msg = document.getElementById("variable-msg");
      msg.textContent = "Thanks for leaving a review!";
      msg.classList.remove("hidden");
    } catch (err) {
      handleError();
    }
  }

  /**
   * This function disabled review submit buttons if the number of rating
   * is not between 0-5
   */
  function reviewButtons() {
    let form = document.getElementById("review-form");
    let ratingInput = document.getElementById("rating");
    let submitBtn = document.querySelector("#review-form button");

    form.addEventListener("input", function () {
      if (
        Number.isNaN(ratingInput.value) ||
        ratingInput.value % 1 !== 0 ||
        ratingInput.value < 0 ||
        ratingInput.value > 5 ||
        ratingInput.value === "" ||
        ratingInput.value.includes(".")
      ) {
        submitBtn.disabled = true;
      } else {
        submitBtn.disabled = false;
      }
    });
  }

  /**
   * This function disabled the buttons for creating or logging in if the
   * fields are not filled in
   */
  function disableLogButtons() {
    let form1 = document.getElementById("form1");
    let usernameInput = document.getElementById("existing-user");
    let passwordInput = document.getElementById("existing-pwd");
    let signInBtn = document.getElementById("sign-in-btn");

    form1.addEventListener("input", function () {
      if (usernameInput.value && passwordInput.value) {
        signInBtn.disabled = false;
      } else {
        signInBtn.disabled = true;
      }
    });

    let form2 = document.getElementById("form2");
    let emailInput = document.getElementById("new-email");
    let newUserInput = document.getElementById("new-user");
    let newPwdInput = document.getElementById("new-pwd");
    let createBtn = document.getElementById("create-btn");

    form2.addEventListener("input", function () {
      if (emailInput.value && newUserInput.value && newPwdInput.value) {
        createBtn.disabled = false;
      } else {
        createBtn.disabled = true;
      }
    });
  }

  /**
   * This function adds all of the items currently in the database to the
   * homepage
   */
  async function populateHomeItems() {
    let data = await fetchAllItems();
    console.log(data);
    let container = document.getElementById("item-container");
    for (let i = 0; i < data.length; i++) {
      let item = createItemCard(data[i]);
      container.appendChild(item);
    }
    cozyCompact();
  }

  /**
   * This function adds event listeners to buttons on the account page
   */
  function accountPageEvent() {
    let homeBtn = document.getElementById("home-btn");
    let orderBtn = document.getElementById("order-btn");
    let logoutBtn = document.getElementById("logout-btn");
    let isLogged = document.getElementById("logged-in");
    let homePg = document.getElementById("home-page");
    let historyPg = document.getElementById("order-history");

    homeBtn.addEventListener("click", function () {
      let hideArr = [
        historyPg,
        document.getElementById("leave-review"),
        document.getElementById("variable-msg"),
        document.getElementById("error-msg"),
      ];
      hideAllViews(homePg, hideArr);
      if (localStorage.getItem("logged in") === "true") {
        isLogged.classList.remove("hidden");
        document.getElementById("guest-user").classList.add("hidden");
      } else {
        isLogged.classList.add("hidden");
        document.getElementById("guest-user").classList.remove("hidden");
      }
    });

    orderBtn.addEventListener("click", orderHistFunctionality);

    logoutBtn.addEventListener("click", logout);
  }

  /**
   * this function adds functionality to the order button and either tells
   * the user to login or shows their order history if they have any
   */
  async function orderHistFunctionality() {
    let message = document.querySelector("#order-history p");
    document.getElementById("order-history").classList.remove("hidden");
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("variable-msg").classList.add("hidden");
    document.getElementById("leave-review").classList.add("hidden");
    document.getElementById("error-msg").classList.add("hidden");
    let orderContainer = document.getElementById("all-orders");
    orderContainer.innerHTML = "";
    if (localStorage.getItem("logged in") === "true") {
      message.classList.add("hidden");
      let username = localStorage.getItem("username");
      let data = await fetchOrderHistory(username);
      if (data === "no purchases yet") {
        message.classList.remove("hidden");
        message.textContent = "You have no orders yet, start spendin!";
      } else {
        for (let i = 0; i < data.length; i++) {
          let orderCard = createOrderCard(data[i], i);
          orderContainer.appendChild(orderCard);
        }
      }
    } else {
      message.classList.remove("hidden");
      message.textContent = "Log in before viewing order history";
    }
    let reviewBtns = document.querySelectorAll("#all-orders button");
    reviewBtnFunctionality(reviewBtns);
  }

  /**
   * This button switches views from the order page to create a review page
   * @param {Nodelist} reviewBtns of all review buttons
   */
  function reviewBtnFunctionality(reviewBtns) {
    let orderHist = document.getElementById("order-history");
    let reviewView = document.getElementById("leave-review");
    for (let i = 0; i < reviewBtns.length; i++) {
      reviewBtns[i].addEventListener("click", function () {
        makeReview(this.parentNode.parentNode);
        orderHist.classList.add("hidden");
        reviewView.classList.remove("hidden");
      });
    }
  }

  /**
   * This is a function to check if a user has already left a review for an item
   * @param {String} id object id
   * @returns {Boolean} true or false
   */
  async function checkReview(id) {
    let currentReviews = await fetchReviews(id);
    let isReviewer = false;
    for (let i = 0; i < currentReviews.length; i++) {
      if (currentReviews[i].username === localStorage.getItem("username")) {
        isReviewer = true;
      }
    }
    return isReviewer;
  }

  /**
   * This is a helper function to create an order card for each item of history
   * @param {Object} data object data
   * @param {Integer} i order number count
   * @returns {Object} HTML element order history card
   */
  function createOrderCard(data, i) {
    let div = document.createElement("div");
    let reviewBtn = document.createElement("button");
    let h2 = document.createElement("h2");
    let article = document.createElement("article");
    let img = document.createElement("img");
    let itemInfoDiv = document.createElement("div");
    let itemName = document.createElement("h3");
    let dateOrderedP = document.createElement("p");
    let priceP = document.createElement("p");
    let hr = document.createElement("hr");
    article.id = "item_" + data.item_id;
    h2.textContent =
      "Order " + (i + 1) + " - Transaction Number " + data.transaction_id;
    img.src = data.src + ".jpg";
    itemName.textContent = data.name;
    dateOrderedP.textContent = "Date Ordered: " + dateTime(data);
    priceP.textContent = "Total: $" + data.price.trim();
    reviewBtn.textContent = "Write a review";

    itemInfoDiv.appendChild(itemName);
    itemInfoDiv.appendChild(dateOrderedP);
    itemInfoDiv.appendChild(priceP);
    itemInfoDiv.appendChild(reviewBtn);

    article.appendChild(img);
    article.appendChild(itemInfoDiv);

    div.appendChild(h2);
    div.appendChild(hr);
    div.appendChild(article);
    return div;
  }

  /**
   * This is a helper function to transform the way the date is represented
   * from the database to mm/dd/yyyy
   * @param {Object} data object data
   * @returns {String} Date time formatted
   */
  function dateTime(data) {
    let dateTimeString = data.date;
    let datePart = dateTimeString.split(" ")[0];
    let [year, month, day] = datePart.split("-");
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  /**
   * logs a user out of their account
   * returns user to guest view login page
   */
  function logout() {
    let loggedMsg = document.getElementById("logged-msg");
    document.getElementById("order-history").classList.add("hidden");
    document.getElementById("leave-review").classList.add("hidden");
    document.getElementById("variable-msg").classList.add("hidden");
    document.getElementById("home-page").classList.remove("hidden");
    if (localStorage.getItem("logged in") === "true") {
      localStorage.setItem("logged in", "false");
      localStorage.removeItem("username");
      loggedMsg.textContent = "You've been logged out, see you next time!";
    } else {
      loggedMsg.textContent = "You never logged in!";
      document.getElementById("logged-in").classList.remove("hidden");
    }
    document.getElementById("guest-user").classList.add("hidden");
    document.getElementById("logged-in").classList.remove("hidden");
  }

  /**
   * adds all needed event listerners to the login page
   */
  function loginEvents() {
    let signInBtn = document.getElementById("sign-in-btn");
    signInBtn.addEventListener("click", signIn);

    let switchBtns = document.querySelectorAll(".switch");
    switchBtns.forEach((button) => {
      button.addEventListener("click", toggleLoginView);
    });
  }

  /**
   * allows user to sign into their account
   * (users stayed logged in until they hit the logout button)
   * @param {Object} evt - HTML element that triggered the event
   */
  async function signIn(evt) {
    evt.preventDefault();
    let username = document.getElementById("existing-user").value;
    let password = document.getElementById("existing-pwd").value;
    try {
      let params = new FormData();
      params.append("username", username);
      params.append("password", password);
      let res = await fetch("/users/login", { method: "POST", body: params });
      await statusCheck(res);
      localStorage.setItem("logged in", "true");
      localStorage.setItem("username", username);
      setLoggedIn(true);
    } catch (err) {
      let stringError = String(err);
      if ("Error: username or password is incorrect" === stringError) {
        let messageContainer = document.getElementById("logged-in");
        let message = document.getElementById("logged-msg");
        messageContainer.classList.remove("hidden");
        message.textContent = "Incorrect username or password";
      } else {
        handleError();
      }
    }
  }

  /**
   * This function creates a POST request to add a new user to the database,
   * and if it is successful they are logged in.
   * @param {Object} evt event to prevent page reload
   */
  async function createAcct(evt) {
    evt.preventDefault();
    let username = document.getElementById("new-user").value;
    let password = document.getElementById("new-pwd").value;
    let email = document.getElementById("new-email").value;
    try {
      let params = new FormData();
      params.append("username", username);
      params.append("password", password);
      params.append("email", email);
      let res = await fetch("/users/create", { method: "POST", body: params });
      await statusCheck(res);
      localStorage.setItem("logged in", "true");
      localStorage.setItem("username", username);
      setLoggedIn(false);
    } catch (err) {
      let stringErr = String(err);
      if (stringErr === "Error: username already taken") {
        let messageContainer = document.getElementById("logged-in");
        let message = document.getElementById("logged-msg");
        messageContainer.classList.remove("hidden");
        message.textContent = "Username already taken";
      } else {
        handleError();
      }
    }
  }

  /**
   * This toggles the view of the message and create accounts if a user
   * logs in
   * @param {Object} event prevent page from reloading
   */
  function toggleLoginView(event) {
    let messageContainer = document.getElementById("logged-in");
    let createAcctBtn = document.getElementById("create-btn");
    messageContainer.classList.add("hidden");
    event.preventDefault();
    let views = document.querySelectorAll("#guest-user div");
    views.forEach((view) => {
      view.classList.toggle("hidden");
    });
    createAcctBtn.addEventListener("click", createAcct);
  }

  /**
   * sets message for logged in users
   * @param {boolean} isReturningUser -
   * true if user has logged in
   * false if user isn't logged in
   */
  function setLoggedIn(isReturningUser) {
    let loggedMsg = document.getElementById("logged-msg");
    document.getElementById("guest-user").classList.add("hidden");
    if (isReturningUser) {
      loggedMsg.textContent =
        "Welcome back, " +
        localStorage.getItem("username") +
        " feel free to check out your order history or logout from here.";
    } else {
      loggedMsg.textContent =
        "Hi " +
        localStorage.getItem("username") +
        ", feel free to check out your order history or logout from here.";
    }
    document.getElementById("logged-in").classList.remove("hidden");
  }

  /**
   * This helper function creates a card for an item and adds an event
   * listener to each card to navigate to its item page
   * @param {Object} data Json data
   * @returns {Object} HTML element
   */
  function createItemCard(data) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let button = document.createElement("button");
    div.id = data.item_id;
    img.src = data.src + ".jpg";
    img.alt = "picture of " + data.name;
    p1.textContent = data.name;
    p2.textContent = "$" + data.price.trim();
    button.textContent = "Buy now";
    button.addEventListener("click", function () {
      buyNow(data.item_id);
    });

    div.appendChild(img);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(button);
    img.addEventListener("click", showItem);
    p1.addEventListener("click", showItem);
    return div;
  }

  /**
   * This function fills in the cart information for a user to buy an item. if
   * it is out of stock, a message is shown and the user will not be able to
   * buy the item
   * @param {String} id Object id
   */
  async function buyNow(id) {
    let data = await fetchSpecificItem(id);
    if (data) {
      document.getElementById("transaction-result").classList.add("hidden");
      document.getElementById("submit").classList.add("hidden");
      let hideArr = [
        document.getElementById("main-page"),
        document.getElementById("item-page"),
        document.getElementById("user-page"),
        document.getElementById("error-msg"),
      ];
      hideAllViews(document.getElementById("cart"), hideArr);

      if (data.quantity === 0) {
        document.querySelector("#cart div").classList.add("hidden");
        document.querySelector("#cart p").classList.remove("hidden");
      } else {
        document.querySelector("#cart div").classList.remove("hidden");
        document.querySelector("#cart p").classList.add("hidden");
        populateCartCard(data);
      }
    }
  }

  /**
   * This function switches views for the user to submit their transaction
   * @param {Object} data id data
   * @param {string} total price of item
   */
  function confirmToSubmit(data, total) {
    let submitContainer = document.getElementById("submit");
    let orderSum = document.querySelector("#cart div");
    let price = document.querySelector("#submit span");
    let submitBtn = document.querySelector("#submit button");
    price.textContent = total;
    submitContainer.classList.remove("hidden");
    orderSum.classList.add("hidden");

    let newSubmitBtn = document.createElement("button");
    newSubmitBtn.textContent = "Yes, submit transaction";

    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

    newSubmitBtn.addEventListener("click", function () {
      fetchCompleteTransaction(data.item_id);
    });
  }

  /**
   * This is a post fetch to make a transaction. Text is returned to indicate
   *  let data = await response.json();
   * if it was successful or not/
   * @param {String} id item id
   */
  async function fetchCompleteTransaction(id) {
    let username = localStorage.getItem("username");
    let password = document.getElementById("confirm-password").value;
    document.getElementById("confirm-password").value = "";
    try {
      let params = new FormData();
      params.append("id", id);
      params.append("username", username);
      params.append("password", password);
      let res = await fetch("/items/purchase", {
        method: "POST",
        body: params,
      });
      await statusCheck(res);
      let data = await res.text();
      handleTransationSuccess(data);
    } catch (err) {
      if (
        String(err) === "Error: User does not exist" ||
        String(err) === "Error: Password is incorrect"
      ) {
        let resultContainer = document.getElementById("transaction-result");
        document.getElementById("submit").classList.add("hidden");
        resultContainer.classList.remove("hidden");
        let msg = resultContainer.querySelector("p");
        if (String(err) === "Error: User does not exist") {
          msg.textContent =
            "Something went wrong, make sure you are logged in!";
        } else {
          msg.textContent = "Something went wrong, incorrect password!";
        }
      } else {
        handleError();
      }
    }
  }

  /**
   * hides all pages and displays an error message
   */
  function handleError() {
    let hideArr = [
      document.getElementById("main-page"),
      document.getElementById("cart"),
      document.getElementById("item-page"),
      document.getElementById("user-page"),
    ];
    hideAllViews(document.getElementById("error-msg"), hideArr);
  }

  /**
   * handles the purchase if it was successful
   * @param {string} data - converted response from api call to make a purchase
   */
  function handleTransationSuccess(data) {
    if (data === "Success") {
      let resultContainer = document.getElementById("transaction-result");
      document.getElementById("submit").classList.add("hidden");
      resultContainer.classList.remove("hidden");
      let msg = resultContainer.querySelector("p");
      msg.textContent = "Success! Thank you for your purchase";
    }
  }

  /**
   * This function populates information in the cart
   * @param {Object} data item data
   */
  function populateCartCard(data) {
    let name = document.querySelector("#container h3");
    let subtotal = document.querySelector("#subtotal span:nth-child(2)");
    let shipping = document.querySelector("#shipping span:nth-child(2)");
    let tax = document.querySelector("#tax span:nth-child(2)");
    let total = document.querySelector("#total span:nth-child(2)");
    let img = document.querySelector("#container img");
    if (!img) {
      img = document.createElement("img");
      document.querySelector("#container").prepend(img);
    }
    let oldButton = document.querySelector("#checkout");
    let newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);

    name.textContent = data.name;
    subtotal.textContent = "$" + data.price;
    img.src = data.src + ".jpg";

    let price = data.price;
    let parsedPrice = parseInt(price.replace(/,/g, "").split(".")[0]);
    let taxTot = parsedPrice * 0.065;
    shipping.textContent = "$10.00";
    tax.textContent = "$" + taxTot.toFixed(2);
    let intTot = (taxTot + parsedPrice + 10).toFixed(2);
    total.textContent = "$" + intTot;
    newButton.addEventListener("click", function () {
      confirmToSubmit(data, intTot);
    });
  }

  /**
   * This function shows the item page when it is clicked on
   */
  function showItem() {
    let mainPg = document.getElementById("main-page");
    let cartPg = document.getElementById("cart");
    let itemPg = document.getElementById("item-page");
    let userPg = document.getElementById("user-page");
    populateItemPage(this.parentNode);

    hideAllViews(itemPg, [
      mainPg,
      cartPg,
      userPg,
      document.getElementById("error-msg"),
    ]);
  }

  /**
   * This function populates the item page when it is naviagated to
   * @param {HTMLElement} parent - container of element that was clicked
   */
  async function populateItemPage(parent) {
    let itemInfoContainer = document.getElementById("item");
    itemInfoContainer.innerHTML = "";
    let itemData = await fetchSpecificItem(parent.id);
    createProduct(parent, itemData, itemInfoContainer);

    let reviewData = await fetchReviews(parent.id);
    let allReviews = document.getElementById("all-reviews");
    allReviews.innerHTML = "";
    let totalRating = 0;
    let globalRate = document.getElementById("global-rating");
    for (let i = 0; i < reviewData.length; i++) {
      totalRating += reviewData[i].rating;
      let reviewCard = createReviewCard(reviewData[i]);
      allReviews.appendChild(reviewCard);
    }
    globalRate.textContent = (totalRating / reviewData.length).toFixed(1);
  }

  /**
   * This function creates a review card and returns it
   * @param {Object} data review information
   * @returns {Object} HTML element
   */
  function createReviewCard(data) {
    let divElement = document.createElement("div");
    divElement.className = "review";
    let sectionElement = document.createElement("section");
    let innerDivElement1 = document.createElement("div");
    let innerDivElement2 = document.createElement("div");
    let imgElement = document.createElement("img");
    imgElement.src = "img/guest-user.jpg";
    let nameSpanElement = document.createElement("span");
    nameSpanElement.textContent = data.username;
    let ratingSpanElement = document.createElement("span");
    ratingSpanElement.textContent = data.rating + " / 5 ";
    let pElement = document.createElement("p");
    pElement.textContent = data.response;
    innerDivElement2.appendChild(imgElement);
    innerDivElement2.appendChild(nameSpanElement);
    innerDivElement1.appendChild(innerDivElement2);
    innerDivElement1.appendChild(ratingSpanElement);
    sectionElement.appendChild(innerDivElement1);
    sectionElement.appendChild(pElement);
    divElement.appendChild(sectionElement);
    return divElement;
  }

  /**
   * makes an api call to get user purchase history
   * @param {string} username - username to get history of
   * @returns {any} list of all items a user has bought
   */
  async function fetchOrderHistory(username) {
    try {
      let response = await fetch("/history/" + username);
      await statusCheck(response);
      let data = await response.json();
      return data;
    } catch (err) {
      handleError();
    }
  }

  /**
   * This function fetches all of the reviews for an item given its id number
   * @param {String} id object id
   * @returns {Object} data
   */
  async function fetchReviews(id) {
    try {
      let response = await fetch("/reviews/" + id);
      await statusCheck(response);
      let data = await response.json();
      return data;
    } catch (err) {
      handleError();
    }
  }

  /**
   * This function fetches all of the items in json format from the
   * /items endpoint. this is a GET request
   * @returns {Object} Data
   */
  async function fetchAllItems() {
    try {
      let response = await fetch("/items");
      await statusCheck(response);
      let data = await response.json();
      return data.items;
    } catch (err) {
      handleError();
    }
  }

  /**
   * This fetch function fetches the information of an item with its id number
   * @param {String} id id number
   * @returns {Object} Data
   */
  async function fetchSpecificItem(id) {
    try {
      let response = await fetch("/items?id=" + id);
      await statusCheck(response);
      let data = await response.json();
      return data.items[0];
    } catch (err) {
      handleError();
    }
  }

  /**
   * This function adds event listeners to the main nav bar to allow the user
   * to flip between views
   */
  function navButtonEvents() {
    document.getElementById("search").addEventListener("input", searchBtn);
    document.getElementById("search-btn").addEventListener("click", search);
    let brandBtn = document.querySelector(".brand");
    let acctBtn = document.getElementById("acct-btn");
    let mainPg = document.getElementById("main-page");
    let cartPg = document.getElementById("cart");
    let itemPg = document.getElementById("item-page");
    let userPg = document.getElementById("user-page");

    brandBtn.addEventListener("click", displayMain);

    acctBtn.addEventListener("click", function () {
      let hideArr = [
        itemPg,
        mainPg,
        cartPg,
        document.getElementById("order-history"),
        document.getElementById("leave-review"),
        document.getElementById("variable-msg"),
      ];
      hideAllViews(userPg, hideArr);
      document.getElementById("home-page").classList.remove("hidden");
      if (localStorage.getItem("logged in") === "true") {
        document.getElementById("logged-in").classList.remove("hidden");
      } else {
        document.getElementById("logged-in").classList.add("hidden");
        document.getElementById("guest-user").classList.remove("hidden");
      }
    });
  }

  /**
   * displays the main page and all items for sale
   */
  function displayMain() {
    let mainPg = document.getElementById("main-page");
    let hideArr = [
      document.getElementById("cart"),
      document.getElementById("item-page"),
      document.getElementById("user-page"),
      document.getElementById("error-msg"),
    ];
    hideAllViews(mainPg, hideArr);
    let items = document.querySelectorAll("#item-container div");
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("hidden");
    }
    let filters = document.querySelectorAll("#filter input");
    for (let i = 0; i < filters.length; i++) {
      filters[i].checked = false;
      filters[i].disabled = false;
    }
  }

  /**
   * enables/disabled the search button based on what is in the search bar
   */
  function searchBtn() {
    if (this.value.trim().length > 0) {
      document.getElementById("search-btn").disabled = false;
    } else {
      document.getElementById("search-btn").disabled = true;
    }
  }

  /**
   * only displays items that match the search term
   */
  async function search() {
    let mainPg = document.getElementById("main-page");
    let hideArr = [
      document.getElementById("item-page"),
      document.getElementById("user-page"),
      document.getElementById("cart"),
      document.getElementById("order-history"),
      document.getElementById("leave-review"),
      document.getElementById("variable-msg"),
      document.getElementById("error-msg"),
    ];
    hideAllViews(mainPg, hideArr);
    try {
      let res = await fetch(
        "/search/" + document.getElementById("search").value.trim()
      );
      await statusCheck(res);
      let data = await res.json();
      document.getElementById("search").value = "";
      this.disabled = true;
      displaySearched(data);
    } catch (err) {
      handleError();
    }
  }

  /**
   * displays only items whose name matches the search input
   * @param {any} data - converted response from api call
   */
  function displaySearched(data) {
    let items = document.querySelectorAll("#item-container div");
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add("hidden");
    }
    for (let i = 0; i < data.length; i++) {
      document.getElementById(data[i].item_id).classList.remove("hidden");
    }
  }

  /**
   * This is a helper function to hide and show views
   * @param {Object} toShow HTML element to unhide
   * @param {NodeList} hideArr HTML elements to hide
   */
  function hideAllViews(toShow, hideArr) {
    toShow.classList.remove("hidden");
    for (let i = 0; i < hideArr.length; i++) {
      hideArr[i].classList.add("hidden");
    }
  }

  /**
   * This is a status check function for the fetch functions
   * @param {Object} res response
   * @returns {error} an error if code not within range, otherwise response
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * This function creates the top portion of the product page containing
   * the photo and the description of the item.
   * @param {Object} parent HTML element of item clicked
   * @param {Object} data data of object by its id
   * @param {Object} itemInfoContainer to append item to
   */
  function createProduct(parent, data, itemInfoContainer) {
    let itemImg = document.createElement("img");
    let imgContainer = document.createElement("div");
    let descriptionContainer = document.createElement("section");
    let div1 = document.createElement("div");
    let h21 = document.createElement("h2");
    let h22 = document.createElement("h2");
    let p1 = document.createElement("p");
    let addToBag = document.createElement("button");
    itemImg.src = parent.querySelector("img").src;
    itemImg.alt = parent.querySelector("img").alt;

    h21.textContent = data.name;
    h22.textContent = "$" + data.price.trim();
    addToBag.textContent = "Buy now";
    p1.textContent = data.description;
    addToBag.addEventListener("click", function () {
      buyNow(data.item_id);
    });

    itemInfoContainer.appendChild(imgContainer);
    imgContainer.appendChild(itemImg);
    itemInfoContainer.appendChild(descriptionContainer);
    descriptionContainer.appendChild(div1);
    descriptionContainer.appendChild(p1);
    descriptionContainer.appendChild(addToBag);
    div1.appendChild(h21);
    div1.appendChild(h22);
  }

  /**
   * allows user to switch between cozy and compact views
   */
  function cozyCompact() {
    let cozy = document.getElementById("cozy");
    let compact = document.getElementById("compact");
    let imgs = document.querySelectorAll("#main-page img");
    let divs = document.querySelectorAll("#item-container div");

    compact.addEventListener("click", function () {
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].classList.add("tight");
      }

      for (let i = 0; i < divs.length; i++) {
        divs[i].classList.add("tight");
      }
    });

    cozy.addEventListener("click", function () {
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].classList.remove("tight");
      }

      for (let i = 0; i < divs.length; i++) {
        divs[i].classList.remove("tight");
      }
    });
  }
})();
