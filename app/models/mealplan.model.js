"user strict";

const Recipe = require("./recipe.model");
const Meal = require("./meal.model");

var dbConn = require("../config/db.config");

var MealPlan = function (
  id,
  meal_id,
  meal_date,
  meal_time,
  meal_datetime,
  username,
  meal
) {
  this.id = id;
  this.meal_id = meal_id;
  this.meal_date = meal_date;
  this.meal_time = meal_time;
  this.meal_datetime = meal_datetime;
  this.username = username;
  this.meal = meal;
};

MealPlan.createMealPlan = function (newMealPlan, result) {
  dbConn.query(
    "INSERT INTO meal_plans (meal_id, meal_datetime, username) VALUES (?, ?, ?);",
    [newMealPlan.meal_id, newMealPlan.meal_datetime, newMealPlan.username],
    (err, res, fields) => {
      if (err) {
        console.error("Error inserting meal plan: ", err);
        result(err, null);
        return;
      }

      const newMealPlanId = res.insertId;

      console.log("Meal plan inserted successfully");
      result(null, newMealPlanId);
    }
  );
};

MealPlan.findByUsername = function (username, result) {
  sql = `select m.id, m.meal_id, m.meal_datetime, m.meal_date, m.meal_time, m.username, m.type, m.diet_preferences, n.name as recipe_name, n.ingredients, n.tags, n.instructions, n.time_estimation, m.recipe_id, m.meal_name
          from (
              select i.id, i.meal_id, i.meal_datetime, date_format(i.meal_datetime, '%Y-%m-%d') as meal_date, date_format(i.meal_datetime, '%H:%i') as meal_time, i.username, j.type, j.diet_preferences, j.recipe_id, j.name as meal_name
              from meal_plans i
              inner join meals j
              on i.meal_id = j.id
              where i.username = ?
          ) m
          inner join (
              select x.id, x.name, x.ingredients, y.tags, x.instructions, x.time_estimation, x.username
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
          ) n
          on m.recipe_id = n.id;`;

  dbConn.query(sql, [username, username, username], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result([]);
    } else {
      let mealplans = [];

      for (const i in res) {
        let recipe = new Recipe(
          res[i].recipe_name,
          res[i].instructions,
          res[i].time_estimation,
          res[i].username,
          res[i].ingredients,
          res[i].tags,
          res[i].recipe_id
        );

        let meal = new Meal(
          res[i].meal_name,
          res[i].type,
          res[i].diet_preferences,
          res[i].username,
          res[i].recipe_id,
          recipe,
          res[i].meal_id
        );

        let mealplan = new MealPlan(
          res[i].id,
          res[i].meal_id,
          res[i].meal_date,
          res[i].meal_time,
          res[i].meal_datetime,
          res[i].username,
          meal
        );

        mealplans.push(mealplan);
      }
      result(mealplans);
    }
  });
};

MealPlan.findByUsernameAndDate = function (username, searchDate, result) {
  sql = `select m.id, m.meal_id, m.meal_datetime, m.meal_date, m.meal_time, m.username, m.type, m.diet_preferences, n.name as recipe_name, n.ingredients, n.tags, n.instructions, n.time_estimation, m.recipe_id, m.meal_name
          from (
              select i.id, i.meal_id, i.meal_datetime, date_format(i.meal_datetime, '%Y-%m-%d') as meal_date, date_format(i.meal_datetime, '%H:%i') as meal_time, i.username, j.type, j.diet_preferences, j.recipe_id, j.name as meal_name
              from meal_plans i
              inner join meals j
              on i.meal_id = j.id
              where i.username = ? and date_format(i.meal_datetime, '%Y-%m-%d') = ?
          ) m
          inner join (
              select x.id, x.name, x.ingredients, y.tags, x.instructions, x.time_estimation, x.username
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
          ) n
          on m.recipe_id = n.id
          order by m.meal_time;`;

  dbConn.query(
    sql,
    [username, searchDate, username, username],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result([]);
      } else {
        let mealplans = [];

        for (const i in res) {
          let recipe = new Recipe(
            res[i].recipe_name,
            res[i].instructions,
            res[i].time_estimation,
            res[i].username,
            res[i].ingredients,
            res[i].tags,
            res[i].recipe_id
          );

          let meal = new Meal(
            res[i].meal_name,
            res[i].type,
            res[i].diet_preferences,
            res[i].username,
            res[i].recipe_id,
            recipe,
            res[i].meal_id
          );

          let mealplan = new MealPlan(
            res[i].id,
            res[i].meal_id,
            res[i].meal_date,
            res[i].meal_time,
            res[i].meal_datetime,
            res[i].username,
            meal
          );

          mealplans.push(mealplan);
        }
        result(mealplans);
      }
    }
  );
};

module.exports = MealPlan;
