"use strict";

const Recipe = require("../models/recipe.model");
const Meal = require("../models/meal.model");
const MealPlan = require("../models/mealplan.model");

var populateInfoInSession = (exports.populateInfoInSession = function (
  req,
  renderPage
) {
  const dailyViewDateChanged = req.query["daily-view-date"];
  if (typeof dailyViewDateChanged !== "undefined") {
    req.session.dvDate = dailyViewDateChanged;
  } else {
    req.session.dvDate = new Date().toISOString().slice(0, 10);
  }

  Recipe.findByUsername(req.session.username, function (recipeResults) {
    req.session.recipes = recipeResults;
    Meal.findByUsername(req.session.username, function (mealResults) {
      req.session.meals = mealResults;
      MealPlan.findByUsername(req.session.username, function (mealPlanResults) {
        req.session.mealplans = mealPlanResults;
        MealPlan.findByUsernameAndDate(
          req.session.username,
          req.session.dvDate,
          function (mealPlanDailyResults) {
            req.session.mealplansOnDVDate = mealPlanDailyResults;
            renderPage();
          }
        );
      });
    });
  });
});

exports.createMeal = function (req, res) {
  // parsing values from request body
  const recipe_id = req.body["add-meal-recipe"].split(",")[0];
  const recipe_name = req.body["add-meal-recipe"].split(",")[1];
  const type = req.body["add-meal-type"];
  const diet_preferences = req.body["add-meal-preferences"];
  const name = recipe_name + "/" + type + "/" + diet_preferences;

  // create meal object
  const newMeal = new Meal(
    name,
    type,
    diet_preferences,
    req.session.username,
    recipe_id,
    null,
    null
  );

  // create meal record in database
  Meal.create(newMeal, function (err, recipe) {
    if (err) {
      populateInfoInSession(req, function () {
        res.render("planner", {
          username: req.session.username,
          addMealResult: "Add meal failed! (" + err + ")",
          addMealPlanResult: null,
          recipes: req.session.recipes,
          meals: req.session.meals,
          mealplans: req.session.mealplans,
          mealplansOnDailyViewDate: req.session.mealplansOnDVDate,
          dailyViewDate: req.session.dvDate,
        });
      });
    } else {
      populateInfoInSession(req, function () {
        res.render("planner", {
          username: req.session.username,
          addMealResult: "Added meal!",
          addMealPlanResult: null,
          recipes: req.session.recipes,
          meals: req.session.meals,
          mealplans: req.session.mealplans,
          mealplansOnDailyViewDate: req.session.mealplansOnDVDate,
          dailyViewDate: req.session.dvDate,
        });
      });
    }
  });
};

exports.addMealToCalendar = function (req, res) {
  // parsing values from request body
  const meal_id = req.body["add-to-cal-meal"].split(",")[0];
  const meal_name = req.body["add-to-cal-meal"].split(",")[1];
  const meal_date = req.body["add-to-cal-date-hidden-input"];
  const meal_time = req.body["add-to-cal-time"];
  const meal_datetime = meal_date + " " + meal_time + ":00";

  // create meal plan object
  const newMealPlan = new MealPlan(
    null,
    meal_id,
    meal_date,
    meal_time,
    meal_datetime,
    req.session.username,
    null
  );

  // create meal plan record in database
  MealPlan.createMealPlan(newMealPlan, function (err, mealplan) {
    if (err) {
      populateInfoInSession(req, function () {
        res.render("planner", {
          username: req.session.username,
          addMealResult: null,
          addMealPlanResult: "Add meal plan failed! (" + err + ")",
          recipes: req.session.recipes,
          meals: req.session.meals,
          mealplans: req.session.mealplans,
          mealplansOnDailyViewDate: req.session.mealplansOnDVDate,
          dailyViewDate: req.session.dvDate,
        });
      });
    } else {
      populateInfoInSession(req, function () {
        res.render("planner", {
          username: req.session.username,
          addMealResult: null,
          addMealPlanResult: "Added meal plan!",
          recipes: req.session.recipes,
          meals: req.session.meals,
          mealplans: req.session.mealplans,
          mealplansOnDailyViewDate: req.session.mealplansOnDVDate,
          dailyViewDate: req.session.dvDate,
        });
      });
    }
  });
};
