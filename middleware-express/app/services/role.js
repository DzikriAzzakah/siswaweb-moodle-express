const { getMoodleDb } = require("../utils/moodle_db");

const GetAllRole = async () => {
  let db = null;
  try {
    const sql = `
      SELECT 
        id,
        shortname AS name,
        description
      FROM
        mdl_role
      ORDER BY id ASC
    `;

    const pool = getMoodleDb();
    db = await pool.getConnection();

    const [rows] = await db.execute(sql);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

module.exports = {
  RoleService: {
    GetAllRole,
  },
};
