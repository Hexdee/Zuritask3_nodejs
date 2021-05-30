# Heroku link 
https://crud-app111.herokuapp.com/

# A CRUD app with database

This is an example of an app built with nodejs and mongodb that can create, read, update and delete from a database.

## Install

    npm install

## Run the app

    node index.js

# REST API

The usage of the REST API is described below.

## Create(save) a new user info

### Request

`POST /infos/`

     Content-Type: json
     Content:
      {
      "name": "Hexdee", "country": "Nigeria", "email": "hexdee10@gmail.com"
      }

### Response

    Response code: 200
    Response:
    {
      "message": "new Info saved",
      "newInfo": {
        "_id": "60b3c300afa0e031266b0e36",
        namee": "Hexdee",
        "country": "Nigeria",
        "email": "hexdee10@gmail.com",
    "__v": 0
  }
}

## Get all user information

### Request

`GET /info/`

### Response

    {"infos":[{"_id":"60b3c300afa0e031266b0e36","name":"Hexdee","country":"Nigeria","email":"hexdee10@gmail.com","__v":0}]}


## Get a specified user info

### Request

`GET /thing/id`

### Response

    { "info": {
    "_id": "60b3c300afa0e031266b0e36",
    "name": "Hexdee",
    "country": "Nigeria",
    "email": "hexdee10@gmail.com",
    "__v": 0
    }
}


## Update a user info

### Request

`PUT /thing/:id`

    Content-Type: json
     Content:
      {
      "name": "Hexdee", "country": "USA", "email": "hexdee100@gmail.com"
      }

### Response

    { "message": " updated successfully" }
    
## Delete a user info

### Request

`DELETE /thing/id`

### Response

    { "message" : "deleted successfully" }

