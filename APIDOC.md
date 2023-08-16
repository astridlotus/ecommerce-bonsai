# Ecommerce API Documentation

The Ecommerce API provides information about the various items listed

## Get all information for all items available for sale.

**Request Format:** /items

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Return the information of all the items for sale (item id, name, description, price, quantity, src, size, difficulty), if given an item id will only give information for the item with the matching id

**Example Request 1:** /items

**Example Response 1:**

```json
[
  {
    "item_id": 1,
    "name": "Japanese White Pine Bonsai",
    "description": "With a scientific name Pinus parviflora, this is a non-flowering tree that prefers full sun. In the wild, it may reach up to 90 feet tall but this one is only a fraction of that. This bonsai is best kept outside",
    "price": 4500,
    "quantity": 1,
    "src": "img/bonsai-img/bonsai1",
    "size": "medium",
    "difficulty": "medium"
  },
  {
    "item_id": 2,
    "name": "Blue Jacaranda Bonsai",
    "description": "Commonly known as a Jacaranda mimosifolia, this is once of the most aesthetically pleasing bonsai. It has long lasting purple colored flowers that are bell shaped. This is native to the south central South American region. In nature, they can grow up to 50 feet tall.",
    "price": 5500,
    "quantity": 1,
    "src": "img/bonsai-img/bonsai2",
    "size": "medium",
    "difficulty": "easy"
  },
  ...
]
```

**Example Request 2:** /items?id=1

**Example Response 2:**

**Description 2:** Return the information of just the item with a matching id
(item id, name, description, price, quantity, src, size, difficulty)

```json
[
  {
    "item_id": 1,
    "name": "Japanese White Pine Bonsai",
    "description": "With a scientific name Pinus parviflora, this is a non-flowering tree that prefers full sun. In the wild, it may reach up to 90 feet tall but this one is only a fraction of that. This bonsai is best kept outside",
    "price": 4500,
    "quantity": 1,
    "src": "img/bonsai-img/bonsai1",
    "size": "medium",
    "difficulty": "medium"
  }
]
```

**Error Handling:**

- Possible 400 (invalid request) errors (all plain text):
  - If passed in an invalid item id, returns an error with the message: `Error: not a valid id`
- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `Internal Server Error`

## Gets item id for all items that contain the search word

**Request Format:** /search/:search

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Given a search parameter looks for all items whose name contains the search and returns all their item ids

**Example Request:** /search/japanese

**Example Response:**

```json
[
  {
    "item_id": 1
  },
  {
    "item_id": 3
  },
  {
    "item_id": 7
  },
  {
    "item_id": 9
  }
]
```

**Error Handling:**

- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `Internal Server Error`

## filters for items based on either price/size/difficulty

**Request Format:** /sort/:type/:filter

**Request Type**: GET

**Returned Data Format**: JSON

**Description:** Given a valid sorting type looks for items that fit in the corresponding filter and returns all their ids

**Example Request:** /sort/price/25

**Example Response:**

```json
[
  {
    "item_id": 16
  }
]
```

**Error Handling:**

- Possible 400 (invalid request) errors (all plain text):
  - If passed an invalid sorting type: `invalid filter input`
- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `Internal Server Error`

## adds a new review to an item

**Request Format:** /reviews/create endpoint with POST parameters of `item_id`, `username`, `response` and `rating`

**Request Type**: POST

**Returned Data Format**: Plain Text

**Description:** Given a valid `item_name` will add a rating for the item into the database. A valid item name is one that exist in the database

**Example Request:** /reviews/create with POST parameters of `item_name=Japanese White Pine Bonsai`, `username=sunanna`, `response=this is so cool!` and `rating=4`

**Example Response:**

```
review has been added!
```

**Error Handling:**

- Possible 400 (invalid request) errors (all plain text):
  - If missing any of the parametes (item_name, username, response, or rating), an error is returned with the message: `Missing one or more of the required params`
  - If passed in a non-existing item name, an error is returned with: `item does not exist`
- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `An error occurred on the server. Try again later.`

## Gets all reviews for an item

**Request Format:** /reviews/:id

**Request Type**: GET

**Returned Data Format**: JSON

**Description:** Given a valid item id returns a JSON object of all reviews for the item, returns a JSON object with a descriptive message if no reviews have been made for an item yet

**Example Request:** /reviews/1

**Example Response:**

```json
[
  {
    "item_id": 1,
    "username": "abowde",
    "response": "really great",
    "rating": 5
  }
]
```

**Error Handling:**

- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `Internal Server Error`

## Gets all reviews for an item

**Request Format:** /items/purchase

**Request Type**: POST

**Returned Data Format**: Text

**Description:** Given a valid item_id and username, an item can be purchased. If successful, the item quantity
will decrease by one and a new entry will be added to the history table for the user. Quantities with a negative
quantity are 'infinite' and otherwise they are limited. If the item is out of stock or the user is not logged in
then an error will the thrown

**Example Request:** /items/purchase

**Example Response:**

`Success`

**Error Handling:**

- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `Internal Server Error`
  - If the item is out of stock, returns and error with the message: `Item is out of stock`
- Possible 400 errors(all plain text):
  - if the user is not logged in, returns an error with the message: `User does not exist`
  - if valid body params are missing, returns an error with the message: `Missing one or more of the required params`

## creates a new user profile

**Request Format:** /users/create endpoint with POST parameters of `username`, `password` and `email`

**Request Type**: POST

**Returned Data Format**: JSON

**Description:** Given a valid `username` will add the given information into the database and creating a new profile. A valid username is one that does not yet exist in the database

**Example Request:** /users/create with POST parameters of `username=sunanna`, `password=mangos` and `email=sunanna@uw.edu`

**Example Response:**

```json
[
  {
    "username": "sunanna",
    "password": "mangos",
    "email": "sunanna@uw.edu"
  }
]
```

**Error Handling:**

- Possible 400 (invalid request) errors (all plain text):
  - If missing any of the parametes (username, password, or email), an error is returned with the message: `Missing one or more of the required params`
  - If passed in an existing username, an error is returned with: `username already taken`
- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `An error occurred on the server. Try again later.`

## Logs a user in

**Request Format:** /users/login endpoint with POST parameters of `username` and `pass`

**Request Type**: POST

**Returned Data Format**: Plain Text

**Description:** Given a valid `username` will check that the `password` is correct, will then allow the user to login and welcome them back. A valid username is one that exist within the database.

**Example Request:** /users/login with POST parameters of `username=abowde` and `password=bellow`

**Example Response:**

```
Welcome back abowde!
```

**Error Handling:**

- Possible 400 (invalid request) errors (all plain text):
  - If missing the username or password, an error is returned with the message: `missing username or password`
  - If passed in an username and password that do not correspond, an error is returned with: `username or password is incorrect`
- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `Internal Server Error`

  ## Searches for a specific user or all users

**Request Format:** /users endpoint with an optional query

**Request Type**: GET

**Returned Data Format**: JSON

**Description:** This endpoint returns all of the users and their information unless a username
is defined, in which the information for just that user is returned, if valid.

**Example Request:** /users

**Example Response:**

```json
[
  {
    "username": "abowde",
    "password": "bellow",
    "email": "abowde@uw.edu",
  },
  {
    "username": "betrothbonsai",
    "password": "wedbonsai",
    "email": "betroth@gmail.com",
  }
]
```
**Error Handling:**

- Possible 400 (invalid request) errors (all plain text):
  - If the username does not exist, returns an error with message `Error: Not a valid username`
- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `Internal Server Error`

  **Description 2:** if username is defined, the information for just that user is returned, if valid.

**Example Request:** /users?user=abowde

**Example Response:**

```json
[
  {
    "username": "abowde",
    "password": "bellow",
    "email": "abowde@uw.edu",
  }
]
```

## Gets the purchase history of a user

**Request Format:** /history/:username

**Request Type**: GET

**Returned Data Format**: JSON

**Description:** Gets all the items purchased by a given user and returns them in a JSON object ordered by date descending (more recent at the top), returns a JSON object with a descriptive message if nothing has been purchased yet

**Example Request:** /history/abowde

**Example Response:**

```json
[
  {
    "item_id": 1,
    "name": "Japanese White Pine Bonsai",
    "description": "With a scientific name Pinus parviflora, this is a non-flowering tree that prefers full sun. In the wild, it may reach up to 90 feet tall but this one is only a fraction of that. This bonsai is best kept outside",
    "price": 4500,
    "quantity": 2,
    "src": "img/bonsai-img/bonsai1",
    "size": "medium",
    "difficulty": "medium",
    "transaction_id": 1001,
    "username": "abowde",
    "date": "2023-05-30 10:57:25"
  }
]
```

**Error Handling:**

- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `Internal Server Error`
