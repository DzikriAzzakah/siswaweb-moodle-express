const { TeacherController } = require("../controllers/teacher");
const router = require("express").Router();

const { VerifyJWTMiddleware } = require("../middlewares/jwt");

router.get("/", [VerifyJWTMiddleware], TeacherController.GetAllUserByFilter);
router.get(
  "/subjects",
  [VerifyJWTMiddleware],
  TeacherController.GetAllSubjectsByTeacherEmail
);
router.get(
  "/assignments",
  [VerifyJWTMiddleware],
  TeacherController.GetAllAssignmentsByTeacherEmailOrSubjectID
);

module.exports = router;
