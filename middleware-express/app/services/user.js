const { getDb } = require("../utils/db");
const { getMoodleDb } = require("../utils/moodle_db");
const { HashPassword } = require("../utils/crypt");

const CreateUser = async (user) => {
  let db = null;
  try {
    const sql = `
      INSERT INTO users (username,password) VALUES (?,?)
    `;
    const hashPassword = await HashPassword(user.password);

    const values = [user.username, hashPassword];

    const pool = getDb();
    db = await pool.getConnection();

    const [result] = await db.execute(sql, values);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

const GetAllUser = async () => {
  let db = null;
  try {
    const sql = `
      SELECT 
        id,
        username,
        created_at,
        updated_at,
        deleted_at 
      FROM
        users
      WHERE
        deleted_at is NULL
    `;

    const pool = getDb();
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

const GetDetailUserById = async (id) => {
  let db = null;
  try {
    const sql = `
      SELECT 
        id,
        username,
        created_at,
        updated_at,
        deleted_at 
      FROM
        users
      WHERE
        id = ?
      AND 
        deleted_at is NULL
    `;
    const values = [id];

    const pool = getDb();
    db = await pool.getConnection();

    const [rows] = await db.execute(sql, values);

    if (rows.length < 1) {
      throw new Error("user not found");
    }

    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

const UpdateUserById = async (id, user) => {
  let db = null;
  try {
    const sqlCheckUserById = `
      SELECT 
        id,
        username,
        created_at,
        updated_at,
        deleted_at 
      FROM
        users
      WHERE
        id = ?
      AND 
        deleted_at is NULL
    `;
    const valueCheckUserById = [id];

    const pool = getDb();
    db = await pool.getConnection();

    const [rows] = await db.execute(sqlCheckUserById, valueCheckUserById);

    if (rows.length < 1) {
      throw new Error("user not found");
    }

    const sqlUpdateUser = `
      UPDATE users SET username = ?, password = ?, updated_at = ? WHERE id = ?
    `;

    const hashPassword = await HashPassword(user.password);

    const valueUpdateUser = [user.username, hashPassword, new Date(), id];

    const [result] = await db.execute(sqlUpdateUser, valueUpdateUser);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

const DeleteUserById = async (id) => {
  let db = null;
  try {
    const sqlCheckUserById = `
      SELECT 
        id,
        username,
        created_at,
        updated_at,
        deleted_at
      FROM
        users
      WHERE
        id = ?
      AND 
        deleted_at is NULL
    `;
    const valueCheckUserById = [id];

    const pool = getDb();
    db = await pool.getConnection();

    const [rows] = await db.execute(sqlCheckUserById, valueCheckUserById);

    if (rows.length < 1) {
      throw new Error("user not found");
    }

    const sqlUpdateUser = `
      UPDATE users SET deleted_at = ? WHERE id = ?
    `;

    const valueUpdateUser = [new Date(), id];

    const [result] = await db.execute(sqlUpdateUser, valueUpdateUser);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

const GetUserByPhoneNumber = async (phoneNumber) => {
  let db = null;
  try {
    let sql = `
      SELECT DISTINCT 
        CONCAT(mu.firstname,' ',mu.lastname) AS full_name,
        (SELECT data FROM mdl_user_info_data muid JOIN mdl_user_info_field muif ON muif.id = muid.fieldid WHERE muif.shortname='parentsNo' AND muid.userid = mu.id) AS parents_number,
        (SELECT data FROM mdl_user_info_data muid JOIN mdl_user_info_field muif ON muif.id = muid.fieldid WHERE muif.shortname='parentsName' AND muid.userid = mu.id) AS parents_name,
        mu.username,
        mu.email,
        mr.shortname AS role_name
      FROM 
        mdl_role_assignments mra 
      JOIN
        mdl_user mu
      ON
        mu.id = mra.userid 
      JOIN
        mdl_role mr
      ON
        mr.id = mra.roleid
      JOIN
        mdl_user_info_data muid
      ON
        muid.userid = mu.id
      WHERE
        muid.data = ?
      LIMIT 1
    `;
    let values = [phoneNumber];

    const pool = getMoodleDb();
    db = await pool.getConnection();
    const [rows] = await db.execute(sql, values);

    if (rows.length < 1) {
      throw new Error("user not found");
    }

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.release();
  }
};

module.exports = {
  UserService: {
    CreateUser,
    GetAllUser,
    GetDetailUserById,
    UpdateUserById,
    DeleteUserById,
    GetUserByPhoneNumber,
  },
};
