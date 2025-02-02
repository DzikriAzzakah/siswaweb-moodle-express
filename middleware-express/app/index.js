const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const {
  HealthCheckRoute,
  UserRoute,
  AuthRoute,
  TeacherRoute,
  StudentRoute,
  RoleRoute,
  RedisRoute,
} = require("./routes/index");
const NotFoundMiddleware = require("./middlewares/not_found");
const GlobalErrorMiddleware = require("./middlewares/global_error");

const { InitConnectionDatabase } = require("./utils/db");
const { InitConnectionDatabaseMoodle } = require("./utils/moodle_db");
const { InitConnectionRedis } = require("./utils/redis");

// Connect to database main
InitConnectionDatabase()
  .then(() => {
    console.log("Database Main connected");
  })
  .catch((e) => console.error(e));

// Connect to database moodle
InitConnectionDatabaseMoodle()
  .then(() => {
    console.log("Database Moodle connected");
  })
  .catch((e) => console.error(e));

// Connect to redis
InitConnectionRedis()
  .then(() => {
    console.log("Redis connected");
  })
  .catch((e) => console.error(e));

// Setup essensial configurations
app.use(bodyParser.json());
app.use(cors());

// Register Module Route
app.use("/api/v1/health", HealthCheckRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/teacher", TeacherRoute);
app.use("/api/v1/student", StudentRoute);
app.use("/api/v1/role", RoleRoute);
app.use("/api/v1/redis", RedisRoute);

// Register Global Route
app.use(NotFoundMiddleware);
app.use(GlobalErrorMiddleware);

module.exports = app;
