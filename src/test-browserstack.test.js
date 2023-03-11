const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");

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

  it("perform a test on login form", async () => {
    await driver.get("http://127.0.0.1:5000/login");

    await driver.wait(until.elementLocated(By.css("#sign-in-form")));
    await driver.findElement(By.css("#sign-in-form")).click();

    await driver.findElement(By.css("#login-btn")).click();
  }, 100000);
});
