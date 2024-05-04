const { AuthController } = require("../controllers/auth");
const { body } = require("express-validator");
const router = require("express").Router();

router.post(
  "/login",
  body("username").notEmpty().isLength({ min: 4 }),
  body("password").notEmpty().isLength({ min: 5 }),
  AuthController.Login
);

module.exports = router;
