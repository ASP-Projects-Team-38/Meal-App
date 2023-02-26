"user strict";
var dbConn = require("../config/db.config");

var Recipe = function (
  name,
  instructions,
  time_estimations,
  username,
  ingredients,
  tags
) {
  this.name = name;
  this.instructions = instructions;
  this.time_estimations = time_estimations;
  this.username = username;
  this.ingredients = ingredients;
  this.tags = tags;
};

Recipe.create = function (newRecipe, result) {
  dbConn.beginTransaction();

  dbConn.query(
    "INSERT INTO recipes(name, instructions, time_estimation, username) VALUES (?, ?, ?, ?);",
    [newRecipe.name, newRecipe.instructions, newRecipe.time_estimations, newRecipe.username],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        dbConn.rollback();
        result(err, null);
      } else {
        let newRecipeId = res.insertId;

        for (const ingredient in newRecipe.ingredients) {
          dbConn.query(
            "INSERT INTO recipe_ingredients(recipe_id, name, amount) VALUES (?, ?, ?);",
            [newRecipeId, ingredient, newRecipe.ingredients[ingredient]],
            function (err, res) {
              if (err) {
                console.log("error: ", err);
                dbConn.rollback();
                result(err, null);
              } else {
                console.log(res.insertId);
              }
            }
          );
        }

        for (const tag of newRecipe.tags) {
          dbConn.query(
            "INSERT INTO recipe_tags(recipe_id, name) VALUES (?, ?);",
            [newRecipeId, tag],
            function (err, res) {
              if (err) {
                console.log("error: ", err);
                dbConn.rollback();
                result(err, null);
              } else {
                console.log(res.insertId);
                dbConn.commit();
                result(null, newRecipeId);
              }
            }
          );
        }

      }
    }
  );
};

Recipe.findByUsername = function (username, result) {
  sql = `select d.name, GROUP_CONCAT(CONCAT(d.i_name, ':', d.i_amount)) as ingredients, d.tags, d.instructions, d.time_estimation, d.username
          from (
            select a.name as name, a.instructions, a.time_estimation, a.username, b.name as i_name, b.amount as i_amount, GROUP_CONCAT(c.name) as tags
            from recipes a
            inner join recipe_ingredients b
            on a.id = b.recipe_id
            inner join recipe_tags c
            on a.id = c.recipe_id
            where a.username = ?
            group by a.name, b.name, b.amount, a.instructions, a.time_estimation, a.username
          ) d
          group by d.name, d.tags, d.instructions, d.time_estimation, d.username
          order by d.name DESC`

  dbConn.query(sql, username, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result([]);
    } else {
      console.log("test recipes: ", res);
      let recipes = [];

      for (const i in res) {
        let tags = res[i].tags.split(",");
        let ingredientsList = res[i].ingredients.split(",");
        let ingredients = {};
        for (ingredient of ingredientsList) {
          let item = ingredient.split(":");
          ingredients[item[0]] = item[1];
        }

        let recipe = new Recipe(
          res[i].name,
          res[i].instructions,
          res[i].time_estimation,
          res[i].username,
          ingredients,
          tags,
        );

        recipes.push(recipe);
      }
      result(recipes);
    }
  });
};

module.exports = Recipe;
