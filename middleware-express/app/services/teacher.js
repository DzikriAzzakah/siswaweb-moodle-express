const { getMoodleDb } = require("../utils/moodle_db");
const {
  TransformDataIntoGroup,
  TransformUnixTimestampToISOString,
  CheckIfKeyExist,
} = require("../utils/general");

const GetAllUserByFilter = async (filter) => {
  let db = null;
  try {
    let sql = `
      SELECT DISTINCT 
        mu.id,
        mu.username,
        mu.idnumber,
        mu.firstname,
        mu.lastname,
        mu.email,
        mu.phone1,
        mu.phone2,
        mu.institution,
        mu.department,
        mu.address,
        mu.city,
        mu.country
      FROM 
        mdl_role_assignments mra 
      LEFT JOIN
        mdl_user mu
      ON
        mu.id = mra.userid 
    `;
    let values = [];

    if (CheckIfKeyExist(filter, "byRole")) {
      let inlist = "";

      for (let i = 0; i < filter.byRole.length; i++) {
        inlist += "?,";
      }

      inlist = inlist.substring(0, inlist.length - 1);

      sql += ` WHERE mra.roleid IN (${inlist})`;
      values = filter.byRole;
    }

    const pool = getMoodleDb();
    db = await pool.getConnection();
    const [rows] = await db.execute(sql, values);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

const GetAllSubjectsByTeacherEmail = async (teacherEmail) => {
  let db = null;
  try {
    const sql = `
      SELECT
        mc.id,
        mc.fullname AS full_name,
        mc.shortname AS short_name,
        mc.idnumber AS id_number,
        mu.email AS teacher_email
      FROM
        mdl_course mc
      JOIN
        mdl_enrol me
      ON
        me.courseid = mc.id
      JOIN 
        mdl_user_enrolments mue
      ON
        mue.enrolid = me.id
      JOIN
        mdl_user mu
      ON
        mue.userid = mu.id
      WHERE
        mu.email = ?
    `;
    const values = [teacherEmail];

    const pool = getMoodleDb();
    db = await pool.getConnection();
    const [rows] = await db.execute(sql, values);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

const GetAllAssignmentsByTeacherEmail = async (teacherEmail) => {
  let db = null;
  try {
    const sql = `
        SELECT DISTINCT
          ma.id,
          ma.name,
          ma.duedate AS due_date,
          mc.idnumber AS id_number
        FROM 
          mdl_assign ma
        JOIN
          mdl_course mc
        ON
          mc.id = ma.course
        JOIN
          mdl_enrol me
        ON
          me.courseid = ma.course
        JOIN
          mdl_user_enrolments mue
        ON
          mue.enrolid = me.id
        JOIN
          mdl_role_assignments mra
        ON
          mra.userid = mue.userid
        JOIN
          mdl_user mu
        ON
          mu.id = mra.userid
        WHERE
          mra.roleid = ?
        AND
          mu.email = ?
        AND
          ma.duedate != 0
        ORDER BY 
          ma.duedate DESC
        LIMIT 5
    `;
    const values = [3, teacherEmail];

    const pool = getMoodleDb();
    db = await pool.getConnection();
    const [rows] = await db.execute(sql, values);

    rows.forEach((e) => {
      e.due_date = TransformUnixTimestampToISOString(e.due_date);
    });

    const results = TransformDataIntoGroup(rows);

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

const GetAllAssignmentsByTeacherEmailAndSubjectId = async (
  teacherEmail,
  subjectId
) => {
  let db = null;
  try {
    const sql = `
        SELECT DISTINCT
          ma.id,
          ma.name,
          ma.duedate AS due_date,
          mc.idnumber AS id_number
        FROM 
          mdl_assign ma
        JOIN
          mdl_course mc
        ON
          mc.id = ma.course
        JOIN
          mdl_enrol me
        ON
          me.courseid = ma.course
        JOIN
          mdl_user_enrolments mue
        ON
          mue.enrolid = me.id
        JOIN
          mdl_role_assignments mra
        ON
          mra.userid = mue.userid
        JOIN
          mdl_user mu
        ON
          mu.id = mra.userid
        WHERE
          mra.roleid = ?
        AND
          mu.email = ?
        AND
          mc.id = ?
        AND
          ma.duedate != 0
        ORDER BY 
          ma.duedate DESC
    `;
    const values = [3, teacherEmail, subjectId];

    const pool = getMoodleDb();
    db = await pool.getConnection();

    const [rows] = await db.execute(sql, values);

    rows.forEach((e) => {
      e.due_date = TransformUnixTimestampToISOString(e.due_date);
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
  TeacherService: {
    GetAllUserByFilter,
    GetAllSubjectsByTeacherEmail,
    GetAllAssignmentsByTeacherEmail,
    GetAllAssignmentsByTeacherEmailAndSubjectId,
  },
};
