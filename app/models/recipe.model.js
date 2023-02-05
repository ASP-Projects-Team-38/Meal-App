"user strict";
var dbConn = require("../config/db.config");

var Recipe = function (recipe) {
  this.name = recipe.name;
  this.content = recipe.content;
};

Recipe.create = function (newRecipe, result) {
  dbConn.query("INSERT INTO recipes set ?", newRecipe, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Recipe.findById = function (id, result) {
  dbConn.query("Select * from recipes where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Recipe.findAll = function (result) {
  dbConn.query("Select * from recipes", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("recipes : ", res);
      result(null, res);
    }
  });
};

Recipe.update = function (id, recipe, result) {
  dbConn.query(
    "UPDATE recipes SET name=?, content=? WHERE id = ?",
    [recipe.name, recipe.content, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Recipe.delete = function (id, result) {
  dbConn.query("DELETE FROM recipes WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Recipe;
