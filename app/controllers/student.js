const { StudentService } = require("../services/student");
const { validationResult } = require("express-validator");

const GetAllStudentsByParentNumber = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { parentNumber } = await req.query;

    const results = await StudentService.GetAllStudentsByParentNumber(
      parentNumber
    );

    res.status(200).json({
      message: "success get all students by parent number",
      data: results,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const GetScoreStudentsByParentNumberAndAssignmentId = async (
  req,
  res,
  next
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { parentNumber, assignmentId } = await req.query;

    const results =
      await StudentService.GetScoreStudentsByParentNumberAndAssignmentId(
        parentNumber,
        assignmentId
      );

    res.status(200).json({
      message: "success get score students by parent number and assignment id",
      data: results,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  StudentController: {
    GetAllStudentsByParentNumber,
    GetScoreStudentsByParentNumberAndAssignmentId,
  },
};
