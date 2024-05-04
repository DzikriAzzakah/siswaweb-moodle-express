require("dotenv").config();

const app = require("./app");
const port = process.env.APP_PORT || 8000;
console.log("APP STARTED");
app.listen(port);
