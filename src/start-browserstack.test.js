const { Builder, By, Capabilities } = require("selenium-webdriver");
require("chromedriver");

describe("BStack meal app test", () => {
  let driver;

  beforeAll(() => {
    driver = new Builder()
      .usingServer(`http://localhost:4444/wd/hub`)
      .withCapabilities(Capabilities.chrome())
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("performs a local test of the login page", async () => {
    await driver.get("http://127.0.0.1:5000/login");

    expect(await driver.getTitle()).toContain("Meal App | Log In");
  }, 10000000);
});
