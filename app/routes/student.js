const { StudentController } = require("../controllers/student");
const { query } = require("express-validator");
const router = require("express").Router();

const { VerifyJWTMiddleware } = require("../middlewares/jwt");

router.get(
  "/",
  [VerifyJWTMiddleware],
  query("parentNumber").notEmpty().isMobilePhone(),
  StudentController.GetAllStudentsByParentNumber
);

router.get(
  "/scores",
  [VerifyJWTMiddleware],
  query("parentNumber").notEmpty().isMobilePhone(),
  query("assignmentId").notEmpty().isInt(),
  StudentController.GetScoreStudentsByParentNumberAndAssignmentId
);

module.exports = router;
