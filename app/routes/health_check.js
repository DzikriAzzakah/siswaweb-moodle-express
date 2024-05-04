const { HealthCheckController } = require("../controllers/health_check.js");
const router = require("express").Router();

router.get("/", HealthCheckController.HealthCheck);

module.exports = router;
