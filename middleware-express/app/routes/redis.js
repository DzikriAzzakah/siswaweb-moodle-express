const { RedisController } = require("../controllers/redis");
const { body, param } = require("express-validator");
const router = require("express").Router();

const { VerifyJWTMiddleware } = require("../middlewares/jwt");

router.post(
  "/set",
  [VerifyJWTMiddleware],
  body("key").notEmpty().isString(),
  body("ttl").notEmpty().isInt(),
  body("value").notEmpty(),
  RedisController.Set
);
router.get(
  "/get/:key",
  [VerifyJWTMiddleware],
  param("key").notEmpty().isString(),
  RedisController.GetByKey
);

module.exports = router;
