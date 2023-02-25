const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const userController = require("./app/controllers/user.controller");

const app = express();
const port = process.env.PORT || 5000;

//connecting to the database api
const dbConn = require("./app/config/db.config");

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
    next();
  } else {
    console.log("No user session found");
    res.redirect("/login");
  }
};

app.get("/", sessionChecker, (req, res) => {
  res.render("index", { username: req.session.username });
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

const recipeRoutes = require("./app/routes/recipe.routes");
app.use("/api/recipes", recipeRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
