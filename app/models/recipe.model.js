"user strict";
var dbConn = require("../config/db.config");

var Recipe = function (
  name,
  instructions,
  time_estimations,
  username,
  ingredients,
  tags,
  id
) {
  this.name = name;
  this.instructions = instructions;
  this.time_estimations = time_estimations;
  this.username = username;
  this.ingredients = ingredients;
  this.tags = tags;
  this.id = id;
};

Recipe.create = function (newRecipe, result) {
  dbConn.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction: ", err);
      return;
    }

    dbConn.query(
      "INSERT INTO recipes(name, instructions, time_estimation, username) VALUES (?, ?, ?, ?);",
      [
        newRecipe.name,
        newRecipe.instructions,
        newRecipe.time_estimations,
        newRecipe.username,
      ],
      (err, res, fields) => {
        if (err) {
          dbConn.rollback(() => {
            console.error("Error inserting recipe data: ", err);
            result(err, null);
          });
          return;
        }

        const newRecipeId = res.insertId;

        let values = "";
        for (const ingredient in newRecipe.ingredients) {
          values +=
            "(" +
            newRecipeId +
            ",'" +
            ingredient +
            "','" +
            newRecipe.ingredients[ingredient] +
            "'),";
        }
        values = values.substring(0, values.length - 1);
        let sql =
          "INSERT INTO recipe_ingredients(recipe_id, name, amount) VALUES " +
          values +
          ";";

        dbConn.query(sql, [], (err, res, fields) => {
          if (err) {
            dbConn.rollback(() => {
              console.error("Error inserting recipe ingredients data: ", err);
              result(err, null);
            });
            return;
          }

          let values = "";
          for (const tag of newRecipe.tags) {
            values += "(" + newRecipeId + ",'" + tag + "'),";
          }
          values = values.substring(0, values.length - 1);
          let sql =
            "INSERT INTO recipe_tags(recipe_id, name) VALUES " + values + ";";

          dbConn.query(sql, [], (err, res, fields) => {
            if (err) {
              dbConn.rollback(() => {
                console.error("Error inserting recipe tags data: ", err);
                result(err, null);
              });
              return;
            }

            dbConn.commit((err) => {
              if (err) {
                dbConn.rollback(() => {
                  console.error("Error committing transaction: ", err);
                  result(err, null);
                });
                return;
              }
              console.log("Data inserted successfully");
              result(null, newRecipeId);
            });
          });
        });
      }
    );
  });
};

Recipe.findByUsername = function (username, result) {
  sql = `select x.id, x.name, x.ingredients, y.tags, x.instructions, x.time_estimation, x.username
          from (
            select a.id, a.name, a.instructions, a.time_estimation, a.username, GROUP_CONCAT(CONCAT(b.name, ':', b.amount)) as ingredients
            from recipes a
            inner join recipe_ingredients b
            on a.id = b.recipe_id
            where a.username = ?
            group by a.id, a.name, a.instructions, a.time_estimation, a.username
          ) x
          left outer join
          (
            select a.id, GROUP_CONCAT(c.name) as tags
            from recipes a
            inner join recipe_tags c
            on a.id = c.recipe_id
            where a.username = ?
            group by a.id
          ) y
          on x.id = y.id
          order by x.id desc;`;

  dbConn.query(sql, [username, username], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result([]);
    } else {
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
          res[i].id
        );

        recipes.push(recipe);
      }
      result(recipes);
    }
  });
};

module.exports = Recipe;
