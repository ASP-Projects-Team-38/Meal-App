"use strict";

// import libs
const mysql = require("mysql2");

// do not put db credentials here, just for dev purpose only
const dbConn = mysql.createConnection({
  host: "127.0.0.1",
  user: "sqluser",
  password: "password",
  database: "meal_app",
});

// connect to DB
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

// module export
module.exports = dbConn;
