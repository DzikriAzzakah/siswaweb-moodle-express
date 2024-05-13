const { TeacherService } = require("../services/teacher");
const { validationResult } = require("express-validator");

const GetAllUserByFilter = async (req, res, next) => {
  try {
    const { roleIds } = await req.query;
    let filter = {};

    if (roleIds !== undefined) {
      // Initialize an array to hold the converted integers
      let roleIdsIntegers = [];

      // Flag to track if there were any non-numeric values
      let hasNonNumericValues = false;

      // Iterate over each value in the roleIds array
      for (let id of roleIds) {
        // Convert the current value to an integer using parseInt
        let integerId = parseInt(id, 10);

        // Check if the conversion was successful
        if (isNaN(integerId)) {
          // If the value is not a valid number, set the flag and break the loop
          hasNonNumericValues = true;
          break;
        } else {
          // Add the integer value to the array of integers
          roleIdsIntegers.push(integerId);
        }
      }

      // If there were any non-numeric values, return an error response
      if (hasNonNumericValues) {
        return res
          .status(400)
          .send({ errors: "Invalid roleIds: Non-numeric values detected" });
      }

      filter = {
        byRole: roleIdsIntegers,
      };
    }

    const results = await TeacherService.GetAllUserByFilter(filter);

    res.status(200).json({
      message: "success get user by filters",
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

    let results;

    if (teacherEmail !== undefined) {
      results = await TeacherService.GetAllSubjectsByTeacherEmail(teacherEmail);
    } else {
      results = await TeacherService.GetAllSubjectsByTeacherEmail(
        req.authorizedUser.email
      );
    }

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
    let getTeacherEmail;

    if (teacherEmail !== undefined) {
      getTeacherEmail = teacherEmail;
    } else {
      getTeacherEmail = req.authorizedUser.email;
    }

    if (subjectId !== undefined) {
      results =
        await TeacherService.GetAllAssignmentsByTeacherEmailAndSubjectId(
          getTeacherEmail,
          subjectId
        );
    } else {
      results = await TeacherService.GetAllAssignmentsByTeacherEmail(
        getTeacherEmail
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
    GetAllUserByFilter,
    GetAllSubjectsByTeacherEmail,
    GetAllAssignmentsByTeacherEmailOrSubjectID,
  },
};
