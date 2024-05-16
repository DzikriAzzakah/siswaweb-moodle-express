const { RoleController } = require("../controllers/role");
const router = require("express").Router();

const { VerifyJWTMiddleware } = require("../middlewares/jwt");

router.get("/", [VerifyJWTMiddleware], RoleController.GetAllRole);

module.exports = router;
