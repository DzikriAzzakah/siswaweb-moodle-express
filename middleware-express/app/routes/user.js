const { UserController } = require("../controllers/user");
const { body, param } = require("express-validator");
const router = require("express").Router();

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

module.exports = router;
