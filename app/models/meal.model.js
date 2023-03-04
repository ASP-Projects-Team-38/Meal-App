"user strict";
var dbConn = require("../config/db.config");

var Meal = function (
  name,
  type,
  diet_preferences,
  username,
  recipe_id,
  recipe,
  id
) {
  this.name = name;
  this.type = type;
  this.diet_preferences = diet_preferences;
  this.username = username;
  this.recipe_id = recipe_id;
  this.recipe = recipe;
  this.id = id;
};

Meal.create = function (newMeal, result) {
  dbConn.query(
    "INSERT INTO meals(name, recipe_id, type, diet_preferences, username) VALUES (?, ?, ?, ?, ?);",
    [
      newMeal.name,
      newMeal.recipe_id,
      newMeal.type,
      newMeal.diet_preferences,
      newMeal.username,
    ],
    (err, res, fields) => {
      if (err) {
        console.error("Error inserting meal: ", err);
        result(err, null);
        return;
      }

      const newMealId = res.insertId;

      console.log("Meal inserted successfully");
      result(null, newMealId);
    }
  );
};

Meal.findByUsername = function (username, result) {
  sql = `select id, name, recipe_id, type, diet_preferences, username
         from meals where username = ?;`;

  dbConn.query(sql, [username], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result([]);
    } else {
      let meals = [];

      for (const i in res) {
        let meal = new Meal(
          res[i].name,
          res[i].type,
          res[i].diet_preferences,
          res[i].username,
          res[i].recipe_id,
          null,
          res[i].id
        );

        meals.push(meal);
      }
      result(meals);
    }
  });
};

module.exports = Meal;
