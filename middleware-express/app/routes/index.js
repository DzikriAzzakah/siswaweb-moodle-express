const HealthCheckRoute = require("./health_check");
const UserRoute = require("./user");
const AuthRoute = require("./auth");
const TeacherRoute = require("./teacher");
const StudentRoute = require("./student");
const RoleRoute = require("./role");
const RedisRoute = require("./redis");

module.exports = {
  HealthCheckRoute,
  UserRoute,
  AuthRoute,
  TeacherRoute,
  StudentRoute,
  RoleRoute,
  RedisRoute,
};
