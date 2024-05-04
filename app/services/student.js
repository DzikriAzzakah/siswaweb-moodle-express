const { getMoodleDb } = require("../utils/moodle_db");
const { TransformUnixTimestampToISOString } = require("../utils/general");

const GetAllStudentsByParentNumber = async (parentNumber) => {
  try {
    const sql = `
        SELECT 
          mu.id,
          mu.username,
          mu.idnumber,
          mu.firstname,
          mu.lastname,
          mu.email,
          mu.phone1,
          mu.lang,
          mu.calendartype,
          mu.timezone,
          mu.firstaccess,
          mu.lastaccess,
          mu.lastlogin,
          mu.currentlogin,
          mu.timecreated,
          mu.timemodified 
        FROM 
          mdl_role_assignments mra 
        JOIN
          mdl_user mu
        ON
          mu.id = mra.userid 
        JOIN
          mdl_user_info_data muid 
        ON
          muid.userid = mu.id
        WHERE 
          mra.roleid = ?
        AND 
          muid.data = ?
    `;
    const values = [5, parentNumber];

    const moodleDB = getMoodleDb();
    const [rows] = await moodleDB.execute(sql, values);

    rows.forEach((e) => {
      e.timecreated = TransformUnixTimestampToISOString(e.timecreated);
      e.timemodified = TransformUnixTimestampToISOString(e.timemodified);
    });

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const GetScoreStudentsByParentNumberAndAssignmentId = async (
  parentNumber,
  assignmentId
) => {
  try {
    const sql = `
       SELECT DISTINCT
          mu.id,
          mu.firstname AS first_name,
          mu.lastname AS last_name,
          ma.name AS assignment_name,
          mag.grade 
        FROM 
          mdl_role_assignments mra 
        JOIN
          mdl_user mu
        ON
          mu.id = mra.userid 
        JOIN
          mdl_user_info_data muid 
        ON
          muid.userid = mu.id
        JOIN
          mdl_user_enrolments mue
        ON
          mue.userid = mu.id
        JOIN
          mdl_enrol me
        ON
          me.id = mue.enrolid
        JOIN
          mdl_assign ma
        ON
          ma.course = me.courseid 
        JOIN
          mdl_course mc
        ON
          mc.id = me.courseid 
        JOIN
          mdl_assign_grades mag
        ON
          mag.userid = mu.id 
        AND 
          mag.assignment = ma.id
        WHERE 
          mra.roleid = ?
        AND
          muid.data = ?
        AND
          ma.id = ?
    `;
    const values = [5, parentNumber, assignmentId];

    const moodleDB = getMoodleDb();
    const [rows] = await moodleDB.execute(sql, values);

    rows.forEach((e) => {
      e.grade = parseInt(e.grade);
    });

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  StudentService: {
    GetAllStudentsByParentNumber,
    GetScoreStudentsByParentNumberAndAssignmentId,
  },
};
