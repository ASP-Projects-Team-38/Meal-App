const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const userController = require("./app/controllers/user.controller");
const recipeController = require("./app/controllers/recipe.controller");

const app = express();

app.use(express.static(__dirname));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    name: "mealapp",
    secret: "some-secret-example",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // This will only work if you have https enabled!
      maxAge: 3600000, // 60 min
    },
  })
);

const sessionChecker = (req, res, next) => {
  console.log(req.session);
  if (req.session.username) {
    console.log("Found user session");
    return next();
  } else {
    console.log("No user session found");
    res.redirect("/login");
  }
};

app.get("/", sessionChecker, (req, res) => {
  recipeController.populateRecipesOfUserInSession(req, function () {
    res.render("index", {
      username: req.session.username,
      addRecipeResult: null,
      recipes: req.session.recipes,
    });
  });
});

app.get("/recipes", sessionChecker, (req, res) => {
  recipeController.populateRecipesOfUserInSession(req, function () {
    res.render("index", {
      username: req.session.username,
      addRecipeResult: null,
      recipes: req.session.recipes,
    });
  });
});

app.get("/planner", sessionChecker, (req, res) => {
  recipeController.populateRecipesOfUserInSession(req, function () {
    res.render("planner", {
      username: req.session.username,
      // addRecipeResult: null,
      // recipes: req.session.recipes,
    });
  });
});

app.get("/groceries", sessionChecker, (req, res) => {
  recipeController.populateRecipesOfUserInSession(req, function () {
    res.render("groceries", {
      username: req.session.username,
      // addRecipeResult: null,
      // recipes: req.session.recipes,
    });
  });
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

app.post("/login", (req, res) => {
  userController.login(req, res);
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views/signup.html"));
});

app.post("/signup", (req, res) => {
  userController.create(req, res);
});

app.get("/logout", (req, res) => {
  req.session.destroy(function () {
    console.log("User logged out");
  });
  res.redirect("/");
});

app.post("/addRecipe", (req, res) => {
  recipeController.create(req, res);
});

module.exports = app;
