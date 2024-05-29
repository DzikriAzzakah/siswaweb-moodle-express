const { UserController } = require("../controllers/user");
const { body, param, query } = require("express-validator");
const router = require("express").Router();

const { VerifyJWTMiddleware } = require("../middlewares/jwt");

router.post(
  "/",
  body("username").notEmpty().isLength({ min: 4 }),
  body("password").notEmpty().isLength({ min: 5 }).isStrongPassword(),
  UserController.CreateUser
);
router.get("/", UserController.GetAllUser);
router.get(
  "/:id",
  param("id").notEmpty().isInt(),
  UserController.GetDetailUserById
);
router.put(
  "/:id",
  param("id").notEmpty().isInt(),
  body("username").notEmpty().isLength({ min: 4 }),
  body("password").notEmpty().isLength({ min: 5 }).isStrongPassword(),
  UserController.UpdateUserById
);
router.delete(
  "/:id",
  param("id").notEmpty().isInt(),
  UserController.DeleteUserById
);
router.get(
  "/phone/detail",
  query("phoneNumber").notEmpty().isMobilePhone(),
  [VerifyJWTMiddleware],
  UserController.GetUserByPhoneNumber
);

module.exports = router;
