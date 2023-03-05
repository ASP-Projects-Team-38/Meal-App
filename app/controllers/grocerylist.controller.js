"use strict";

const GroceryList = require("../models/grocerylist.model");
const Recipe = require("../models/recipe.model");

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

exports.create = function (req, res) {
  // parsing values from request body
  const name = req.body["list-name"];
  const ingredients = req.body["list-ingredients"];

  // create grocery list object
  const newGroceryList = new GroceryList(
    name,
    ingredients,
    req.session.username,
    ""
  );

  // create grocery list record in database
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

exports.generate = function (req, res) {
  // parsing values from request body
  const recipe_id = req.body["generate-list-name"].split(",")[0];
  const recipe_name = req.body["generate-list-name"].split(",")[1];

  Recipe.findIngredentsByRecipeID(recipe_id, function (ingredients) {
    console.log("debug");
    console.log(ingredients);

    // create grocery list object
    const newGroceryList = new GroceryList(
      recipe_name,
      ingredients,
      req.session.username,
      ""
    );

    // create grocery list record in database
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
