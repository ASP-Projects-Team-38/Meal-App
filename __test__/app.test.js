//INTEGRATION TESTS

const app = require("../app");
const request = require("supertest");

const userController = {
  login: jest.fn((x) => x),
  create: jest.fn((x) => x),
};

const recipeController = {
  create: jest.fn((x) => x),
  populateRecipesOfUserInSession: jest.fn((x) => x),
};

//--Green tests--//
describe("session checker", () => {
  it("returns index page and allows the recipe controller page to use the index page ", () => {
    request(app)
      .get("/")
      .expect(200)
      .expect("Content-Type", /html/)
      .expect("body", recipeController.populateRecipesOfUserInSession())
      .then((response) => {
        expect(response.render).toBe("index", {
          username: req.session.username,
          addRecipeResult: null,
          recipes: req.session.recipes,
        });
      });
  });
});

describe("login", () => {
  it("return login page when routing to /login", () => {
    request(app)
      .get("/login")
      .expect(200)
      .expect("Content-Type", /html/)
      .then((response) => {
        expect(response.sendFile).toBe(
          path.join(__dirname, "views/login.html")
        );
      });
  });
  it("allows the user controller page to use the login page", () => {
    request(app).post("/login").expect("body", userController.login());
  });
});
describe("sign-up", () => {
  it("return sign-up page when routing to /signup", () => {
    request(app)
      .get("/signup")
      .expect(200)
      .expect("Content-Type", /html/)
      .then((response) => {
        expext(response.sendFile).toBe(
          path.join(__dirname, "views/signup.html")
        );
      });
  });
  it("allows the user controller page to use the signup page", () => {
    request(app).post("/signup").expect("body", userController.create());
  });
});
describe("create recipe", () => {
  it("allows the recipe controller page to use the addRecipe page", () => {
    request(app).post("/addRecipe").expect("body", recipeController.create());
  });
});
