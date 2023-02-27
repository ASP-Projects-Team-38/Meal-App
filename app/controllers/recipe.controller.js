"use strict";

const Recipe = require("../models/recipe.model");

var populateRecipesOfUserInSession = exports.populateRecipesOfUserInSession = function (req, renderPage) {
  Recipe.findByUsername(req.session.username, function(results) {
    req.session.recipes = results;
    renderPage();
  });
};

exports.create = function (req, res) {
  // parsing values from request body
  const name = req.body["recipe-name"];
  const instructions = req.body["recipe-instructions"];
  const time_estimations = req.body["recipe-time-estimation"];
  let ingredients = {};
  for (const key in req.body) {
    if (key.startsWith("recipe-ingredient")) {
      console.log(key);
      console.log(req.body[key]);
      console.log(req.body["recipe-amount-" + key.split("-")[2]]);
      ingredients[req.body[key]] =
        req.body["recipe-amount-" + key.split("-")[2]];
    }
  }
  const tags = req.body["recipe-tags"].split(",").map(function (item) {
    return item.trim();
  });

  // validations
  if (name === "") {
    let err = "Name is blank";
    populateRecipesOfUserInSession(req, function() {
      res.render("index", {
        username: req.session.username,
        addRecipeResult: "Add recipe failed! (" + err + ")",
        recipes: req.session.recipes,
      });
    });
  }

  // create recipe object
  const newRecipe = new Recipe(
    name,
    instructions,
    time_estimations,
    req.session.username,
    ingredients,
    tags
  );

  // create recipe record in database
  Recipe.create(newRecipe, function (err, recipe) {
    if (err) {
      populateRecipesOfUserInSession(req, function() {
        res.render("index", {
          username: req.session.username,
          addRecipeResult: "Add recipe failed! (" + err + ")",
          recipes: req.session.recipes,
        });
      });
    } else {
      populateRecipesOfUserInSession(req, function() {
        res.render("index", {
          username: req.session.username,
          addRecipeResult: "Added recipe!",
          recipes: req.session.recipes,
        });
      });
    }
  });
};
