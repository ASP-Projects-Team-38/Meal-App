"use strict";

// import libs
const GroceryList = require("../models/grocerylist.model");
const Recipe = require("../models/recipe.model");

// set recipe and grocery lists info in user session
var populateInfoInSession = (exports.populateInfoInSession = function (
  req,
  renderPage
) {
  Recipe.findByUsername(req.session.username, function (recipeResults) {
    req.session.recipes = recipeResults;
    GroceryList.findByUsername(
      req.session.username,
      function (Groceriesresults) {
        req.session.groceryLists = Groceriesresults;
        renderPage();
      }
    );
  });
});

// create grocery list
exports.create = function (req, res) {
  // parsing inputs
  const name = req.body["list-name"];
  const ingredients = req.body["list-ingredients"];

  // create grocery list object
  const newGroceryList = new GroceryList(
    name,
    ingredients,
    req.session.username,
    ""
  );

  // create grocery list record in DB
  GroceryList.create(newGroceryList, function (err, groceryList) {
    if (err) {
      populateInfoInSession(req, function () {
        res.render("groceries", {
          username: req.session.username,
          addGLResult: "Add grocery list failed! (" + err + ")",
          groceryLists: req.session.groceryLists,
          recipes: req.session.recipes,
        });
      });
    } else {
      populateInfoInSession(req, function () {
        res.render("groceries", {
          username: req.session.username,
          addGLResult: "Added grocery list!",
          groceryLists: req.session.groceryLists,
          recipes: req.session.recipes,
        });
      });
    }
  });
};

// generate grocery list by recipe
exports.generate = function (req, res) {
  // parsing inputs
  const recipe_id = req.body["generate-list-name"].split(",")[0];
  const recipe_name = req.body["generate-list-name"].split(",")[1];

  // get ingredents of a recipe
  Recipe.findIngredentsByRecipeID(recipe_id, function (ingredients) {
    // create grocery list object
    const newGroceryList = new GroceryList(
      recipe_name,
      ingredients,
      req.session.username,
      ""
    );

    // create grocery list record in DB
    GroceryList.create(newGroceryList, function (err, groceryList) {
      if (err) {
        populateInfoInSession(req, function () {
          res.render("groceries", {
            username: req.session.username,
            addGLResult: "Generate grocery list failed! (" + err + ")",
            groceryLists: req.session.groceryLists,
            recipes: req.session.recipes,
          });
        });
      } else {
        populateInfoInSession(req, function () {
          res.render("groceries", {
            username: req.session.username,
            addGLResult: "Generated grocery list!",
            groceryLists: req.session.groceryLists,
            recipes: req.session.recipes,
          });
        });
      }
    });
  });
};
