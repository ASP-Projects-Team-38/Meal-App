// set variables
const app = require("./app");
const port = process.env.PORT || 5000;

// run application
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
