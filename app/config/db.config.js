"use strict";
const mysql = require("mysql2");

// do not put db credentials here, just for dev purpose only
const dbConn = mysql.createConnection({
  host: "127.0.0.1",
  user: "meal_app_user",
  password: "meal_app_user",
  database: "meal_app",
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;
