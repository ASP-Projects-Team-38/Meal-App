"use strict";

// import libs
const User = require("../models/user.model");
const recipeController = require("./recipe.controller");

// create user
exports.create = function (req, res) {
  // parsing inputs
  const fname = req.body["fname"];
  const lname = req.body["lname"];
  const email = req.body["email"];
  const dob = req.body["dob"];
  const phoneNumber = req.body["phone-number"];
  const username = req.body["username"];
  const password = req.body["password"];
  const rePassword = req.body["re-password"];

  // check duplicate user name
  User.getUserCountByUsername(username, function (err, userCountResult) {
    if (err) res.send(err);
    if (userCountResult[0].usercount >= 1) {
      console.log("User already exists");
      res.redirect("/signup");
    } else if (password !== rePassword) {
      console.log("Password not match");
      res.redirect("/signup");
    } else {
      // create user object
      const new_user = new User({
        fname,
        lname,
        email,
        dob,
        phoneNumber,
        username,
        password,
      });

      // create user record in DB
      User.create(new_user, function (err, user) {
        if (err) res.send(err);
        res.redirect("/");
      });
    }
  });
};

// user login
exports.login = function (req, res) {
  const username = req.body["username"];
  const password = req.body["password"];

  if (username === "" || password === "") {
    console.log("Username or password is blank");
    res.redirect("/");
  } else {
    User.getUserCountByUsername(username, function (err, userCountResult) {
      if (err) res.send(err);
      if (userCountResult[0].usercount < 1) {
        console.log("User does not exist");
        res.redirect("/");
      } else {
        User.findPasswordByUsername(username, function (err, passwordResult) {
          if (err) res.send(err);
          if (passwordResult[0].password !== password) {
            console.log("Password not match");
            res.redirect("/");
          } else {
            req.session.username = username;
            res.redirect("/");
          }
        });
      }
    });
  }
};
