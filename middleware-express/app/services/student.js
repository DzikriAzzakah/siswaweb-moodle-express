const { getMoodleDb } = require("../utils/moodle_db");
const { TransformUnixTimestampToISOString } = require("../utils/general");

const GetAllStudentsByParentNumber = async (parentNumber) => {
  let db = null;
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

    const pool = getMoodleDb();
    db = await pool.getConnection();

    const [rows] = await db.execute(sql, values);

    rows.forEach((e) => {
      e.timecreated = TransformUnixTimestampToISOString(e.timecreated);
      e.timemodified = TransformUnixTimestampToISOString(e.timemodified);
    });

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

const GetScoreStudentsByParentNumberAndAssignmentId = async (
  parentNumber,
  assignmentId
) => {
  let db = null;

  try {
    const sql = `
       SELECT DISTINCT
          mu.id,
          mu.firstname AS first_name,
          mu.lastname AS last_name,
          ma.name AS assignment_name,
          mc.fullname AS subject_name,
          ma.duedate AS assignment_date,
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

    const pool = getMoodleDb();
    db = await pool.getConnection();

    const [rows] = await db.execute(sql, values);

    rows.forEach((e) => {
      e.grade = parseInt(e.grade);
      e.assignment_date = TransformUnixTimestampToISOString(e.assignment_date);
    });

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

module.exports = {
  StudentService: {
    GetAllStudentsByParentNumber,
    GetScoreStudentsByParentNumberAndAssignmentId,
  },
};
