"user strict";
var dbConn = require("../config/db.config");

var User = function (user) {
  this.fname = user.fname;
  this.lname = user.lname;
  this.email = user.email;
  this.dob = user.dob;
  this.phoneNumber = user.phoneNumber;
  this.username = user.username;
  this.password = user.password;
};

User.create = function (newUser, result) {
  dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.getUserCountByUsername = function (username, result) {
  dbConn.query("Select count(1) as usercount from users where username = ?", username, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.findPasswordByUsername = function (username, result) {
  dbConn.query("Select max(password) as password from users where username = ?", username, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
