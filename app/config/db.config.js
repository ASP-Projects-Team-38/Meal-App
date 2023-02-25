"use strict";
const mysql = require("mysql2");

// do not put db credentials here, just for dev purpose only
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "password",
  database: "meal_app",
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;
