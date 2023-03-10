"user strict";

// import db connection
var dbConn = require("../config/db.config");

// grocery list object
var GroceryList = function (name, ingredients, username, id) {
  this.name = name;
  this.ingredients = ingredients;
  this.username = username;
  this.id = id;
};

// create grocery list record in DB
GroceryList.create = function (newGroceryList, result) {
  dbConn.query(
    "INSERT INTO grocery_lists (name, ingredients, username) VALUES (?, ?, ?);",
    [newGroceryList.name, newGroceryList.ingredients, newGroceryList.username],
    (err, res, fields) => {
      if (err) {
        console.error("Error inserting grocery list: ", err);
        result(err, null);
        return;
      }

      const newGroceryListId = res.insertId;

      console.log("Grocery list inserted successfully");
      result(null, newGroceryListId);
    }
  );
};

// get grocery lists by user name from DB
GroceryList.findByUsername = function (username, result) {
  sql = `select id, name, ingredients, username
         from grocery_lists where username = ?;`;

  dbConn.query(sql, [username], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result([]);
    } else {
      let groceryLists = [];

      for (const i in res) {
        let groceryList = new GroceryList(
          res[i].name,
          res[i].ingredients,
          res[i].username,
          res[i].id
        );

        groceryLists.push(groceryList);
      }
      result(groceryLists);
    }
  });
};

// module export
module.exports = GroceryList;
