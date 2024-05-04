const { TeacherController } = require("../controllers/teacher");
const { query } = require("express-validator");
const router = require("express").Router();

const { VerifyJWTMiddleware } = require("../middlewares/jwt");

router.get("/", [VerifyJWTMiddleware], TeacherController.GetAllTeacher);
router.get(
  "/subjects",
  [VerifyJWTMiddleware],
  query("teacherEmail").notEmpty().isEmail(),
  TeacherController.GetAllSubjectsByTeacherEmail
);
router.get(
  "/assignments",
  [VerifyJWTMiddleware],
  query("teacherEmail").notEmpty().isEmail(),
  TeacherController.GetAllAssignmentsByTeacherEmailOrSubjectID
);

module.exports = router;
