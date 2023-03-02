const userController = require("../controllers/user.controller");
const User = require("../models/user.model");

jest.mock("../models/user.model");

const request = {
  body: {
    username: "test_username",
  },
};

const response = {
  send: jest.fn((x) => x),
  json: jest.fn((x) => x),
};

it("Should send error: User already exists when username exists", async () => {
  User.getUserCountByUsername.mockImplementationOnce(() => ({
    fname: "test_fname",
    lname: "test_lname",
    email: "test_email",
    dob: "test_dob",
    phoneNumber: "test_phoneNumber",
    username: "test_username",
    password: "test_password",
  }));
  await userController.create(request, response);
  expect(response.send).toHaveBeenCalledTimes(1);
  expect(response.json).toHaveBeenCalledWith({ error: "User already exists" });
});
