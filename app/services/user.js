const { getDb } = require("../utils/db");
const { HashPassword } = require("../utils/crypt");

const CreateUser = async (user) => {
  try {
    const sql = `
      INSERT INTO users (username,password) VALUES (?,?)
    `;
    const hashPassword = await HashPassword(user.password);

    const values = [user.username, hashPassword];

    const db = getDb();

    const [result] = await db.execute(sql, values);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const GetAllUser = async () => {
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

    const db = getDb();
    const [rows] = await db.execute(sql);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const GetDetailUserById = async (id) => {
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

    const db = getDb();
    const [rows] = await db.execute(sql, values);

    if (rows.length < 1) {
      throw new Error("user not found");
    }

    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const UpdateUserById = async (id, user) => {
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

    const db = getDb();
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
  }
};

const DeleteUserById = async (id) => {
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

    const db = getDb();
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
  }
};

module.exports = {
  UserService: {
    CreateUser,
    GetAllUser,
    GetDetailUserById,
    UpdateUserById,
    DeleteUserById,
  },
};
