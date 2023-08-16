/**
 * Name: Astrid Bowden and Anna Sun
 * Date: 06.02.2023
 * Section: CSE 154 AB
 *
 * This is the app.js page for our ecommerce site: Bonsai & I. It includes all of
 * the endpoints needed to get information from our database. Some endpoints included
 * are to create a new account, login to an account, write a review, look up
 * information about all the products and so on
 */

"use strict";
const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const multer = require("multer");

// for application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns {sqlite3.Database} - The database object for the connection.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: "ecommerce.db",
    driver: sqlite3.Database
  });
  return db;
}

/**
 * This endpoint is a GET request that returns all of the items if no query
 * params are set. If a query param is set, it needs to be an id and if the id
 * is valid returns the information for just that item id.
 */
app.get("/items", async function(req, res) {
  let id = req.query.id;
  let query = "";
  if (id) {
    query = "SELECT * FROM items WHERE item_id = ?";
  } else {
    query = "SELECT * FROM items";
  }
  try {
    let db = await getDBConnection();
    let results;
    if (id) {
      results = await db.all(query, id);
    } else {
      results = await db.all(query);
    }
    await db.close();
    if (results.length > 0) {
      res.json({items: results});
    } else {
      res.status(400);
      res.type("text");
      res.send("Error: not a valid id");
    }
  } catch (err) {
    res.status(500);
    res.type("text").send("Internal Server Error");
  }
});

/**
 * This endpoint is a GET request that returns all the ids of items with names
 * matching the search parameter
 */
app.get("/search/:search", async function(req, res) {
  let search = req.params.search;
  try {
    let query = "SELECT item_id FROM items WHERE name LIKE ?";
    let db = await getDBConnection();
    let results = await db.all(query, "%" + search + "%");
    await db.close();
    res.json(results);
  } catch (err) {
    res.status(500);
    res.type("text").send("Internal Server Error");
  }
});

/**
 * this endpoint is a GET request that gets all ids that match the filter requirements
 */
app.get("/sort/:type/:filter", async function(req, res) {
  let type = req.params.type;
  let filter = req.params.filter;
  try {
    let query = "SELECT item_id FROM items WHERE ";
    query = alterQuery(type, query, res);
    let db = await getDBConnection();
    let results = await db.all(query, filter);
    await db.close();
    res.json(results);
  } catch (err) {
    res.status(500);
    res.type("text").send("Internal Server Error");
  }
});

/**
 * This endpoint is a POST request that allows a new review to be added to an item
 */
app.post("/reviews/create", async function(req, res) {
  let itemId = req.body.item_id;
  let username = req.body.username;
  let response = req.body.response;
  let rating = req.body.rating;
  try {
    if (!itemId || !username || !response || !rating) {
      errorMsg(res, "Missing one or more of the required params", 400);
    } else {
      let searchQuery = "SELECT * FROM items WHERE item_id = ?";
      let db = await getDBConnection();
      let isExistingItem = await db.get(searchQuery, itemId);
      if (isExistingItem) {
        let addQuery =
          "INSERT INTO reviews (item_id, username, response, rating) VALUES (?, ?, ?, ?)";
        await db.run(addQuery, [itemId, username, response, rating]);
        let getQuery =
          "SELECT * FROM reviews WHERE username = ? AND item_id = ?";
        let results = await db.all(getQuery, [username, itemId]);
        await db.close();
        res.type("json").send(results);
      } else {
        await db.close();
        errorMsg(res, "Item does not exist", 400);
      }
    }
  } catch (err) {
    errorMsg(res, "An error occurred on the server. Try again later.", 500);
  }
});

/**
 * This endpoint is a GET request that returns all the reviews of the item matching
 * the id parameter, if there are no reviews returns a JSON with a message stating
 * no reviews have been made yet for the item
 */
app.get("/reviews/:id", async function(req, res) {
  let id = req.params.id;
  let query = "SELECT * FROM reviews WHERE item_id = ?";
  try {
    let db = await getDBConnection();
    let results = await db.all(query, id);
    await db.close();
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json("no reviews for this item yet");
    }
  } catch (err) {
    res.status(500);
    res.type("text").send("Internal Server Error");
  }
});

/**
 * This POST request takes a username and an item id to make a purchase.
 * if the user does not exist or the item is out of stock, an error is thrown.
 * if the item has a negative quantity, that means it has an "infinite" capacity
 */
app.post("/items/purchase", async function(req, res) {
  let id = req.body.id;
  let username = req.body.username;
  let password = req.body.password;
  let {checkUser, checkQuantity, itemUpdate, userHistory} = createQueries();
  try {
    if (!id || !username || !password) {
      errorMsg(res, "Missing one or more of the required params", 400);
    } else {
      let db = await getDBConnection();
      let isUser = await db.get(checkUser, [username]);
      let isQuantity = await db.all(checkQuantity, [id]);
      if (isUser.length <= 0) {
        errorMsg(res, "User does not exist", 400);
      } else if (isQuantity[0].quantity === 0) {
        errorMsg(res, "Item is out of stock", 400);
      } else if (!checkPassword(isUser.password, password)) {
        errorMsg(res, "Password is incorrect", 400);
      } else {
        await db.run(itemUpdate, [id]);
        await db.run(userHistory, [username, id]);
        res.type("text").send("Success");
        await db.close();
      }
    }
  } catch (err) {
    res.status(500);
    res.type("text").send("Internal Server Error");
  }
});

/**
 * checks if the password a user typed matches their account password
 * @param {string} correct correct account password
 * @param {string} checking password entered by user during checkout
 * @returns {boolean} whether or not the password matches the account
 */
function checkPassword(correct, checking) {
  let check = false;
  if (checking === correct) {
    check = true;
  }
  return check;
}

/**
 * This endpoint is a post request that allows for a new user to be created,
 * if the username is already taken an error is thrown
 */
app.post("/users/create", async function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let searchQuery = "SELECT username FROM users WHERE username = ?";
  let addQuery =
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
  try {
    if (!username || !password || !email) {
      errorMsg(res, "Missing one or more of the required params", 400);
    } else {
      let db = await getDBConnection();
      let isExistingUser = await db.all(searchQuery, [username]);
      if (isExistingUser.length > 0) {
        errorMsg(res, "username already taken", 400);
      } else {
        let userQuery = "SELECT * FROM users WHERE username = ?";
        await db.run(addQuery, [username, password, email]);
        let result = await db.all(userQuery, [username]);
        res.type("json").send(result);
        await db.close();
      }
    }
  } catch (err) {
    errorMsg(res, "An error occurred on the server. Try again later.", 500);
  }
});

/**
 * this endpoint is a POST request that checks if a username and password match,
 * if they do this will return text welcoming the user. If either parameter is missing
 * or do not match will throw an error
 */
app.post("/users/login", async function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  res.type("text");
  if (username && password) {
    try {
      let query = "SELECT * FROM users WHERE username = ? AND password = ?";
      let db = await getDBConnection();
      let results = await db.get(query, [username, password]);
      await db.close();
      if (results) {
        res.send("welcome back " + username);
      } else {
        res.status(400).send("username or password is incorrect");
      }
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("missing username or password");
  }
});

/**
 * This endpoint returns all users unless a query is set which must be the name
 * of the user requested
 */
app.get("/users", async function(req, res) {
  let user = req.query.user;
  try {
    let db = await getDBConnection();
    let results = [];
    if (!user) {
      let query = "SELECT * FROM users";
      results = await db.all(query);
    } else {
      let query = "SELECT * FROM users WHERE username = ?";
      results = await db.all(query, user);
    }
    await db.close();
    if (results.length > 0) {
      res.type("json").send(results);
    } else {
      res.type("text");
      res.status(400).send("Error: Not a valid username");
    }
  } catch (err) {
    errorMsg(res, "Internal Server Error", 500);
  }
});

/**
 * this endpoint is a GET request that returns a given user's purchase history,
 * if no purchases have been made yet returns a JSON with the message that
 * no purchases have been made yet
 */
app.get("/history/:username", async function(req, res) {
  let username = req.params.username;
  let query =
    "SELECT * FROM items i " +
    "JOIN history h ON i.item_id = h.item_id " +
    "WHERE h.username = ? ORDER BY DATETIME(h.date) DESC";
  try {
    let db = await getDBConnection();
    let results = await db.all(query, username);
    await db.close();
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json("no purchases yet");
    }
  } catch (err) {
    res.type("text");
    res.status(500).send("Internal Server Error");
  }
});

/**
 * This is a helper function to declare all the queries for an endpoint
 * @returns {String} All queries
 */
function createQueries() {
  let itemUpdate = "UPDATE items SET quantity = quantity - 1 WHERE item_id = ?";
  let userHistory = "INSERT INTO history (username, item_id) VALUES (?, ?)";
  let checkUser = "SELECT * FROM users WHERE username = ?";
  let checkQuantity = "SELECT quantity FROM items WHERE item_id = ?";
  return {checkUser, checkQuantity, itemUpdate, userHistory};
}

/**
 * This function is a conditional to update a query depending on the size,
 * price and difficulty of an item
 * @param {String} type price
 * @param {String} query query to update
 * @param {Object} res res object
 * @returns {String} final query
 */
function alterQuery(type, query, res) {
  if (type === "price") {
    query += "pricing <= ?";
  } else if (type === "size") {
    query += "size = ?";
  } else if (type === "difficulty") {
    query += "difficulty = ?";
  } else {
    res.type("text");
    res.status(400).send("invalid sorting type or mismatched type and filter");
  }
  return query;
}

/**
 * This function returns a relevant error msg
 * @param {Object} res res
 * @param {String} message error msg
 * @param {Int} status status code
 */
function errorMsg(res, message, status) {
  res.status(status);
  res.type("text");
  res.send(message);
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
