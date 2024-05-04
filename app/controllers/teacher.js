const { TeacherService } = require("../services/teacher");
const { validationResult } = require("express-validator");

const GetAllTeacher = async (req, res, next) => {
  try {
    const results = await TeacherService.GetAllTeacher();

    res.status(200).json({
      message: "success get all teachers",
      data: results,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const GetAllSubjectsByTeacherEmail = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { teacherEmail } = await req.query;

    const results = await TeacherService.GetAllSubjectsByTeacherEmail(
      teacherEmail
    );

    res.status(200).json({
      message: "success get all subjects by teacher email",
      data: results,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const GetAllAssignmentsByTeacherEmailOrSubjectID = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { teacherEmail, subjectId } = await req.query;

    let results;

    if (subjectId !== undefined) {
      results =
        await TeacherService.GetAllAssignmentsByTeacherEmailAndSubjectId(
          teacherEmail,
          subjectId
        );
    } else {
      results = await TeacherService.GetAllAssignmentsByTeacherEmail(
        teacherEmail
      );
    }

    res.status(200).json({
      message: "success get all assignments by teacher email or subject id",
      data: results,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  TeacherController: {
    GetAllTeacher,
    GetAllSubjectsByTeacherEmail,
    GetAllAssignmentsByTeacherEmailOrSubjectID,
  },
};
