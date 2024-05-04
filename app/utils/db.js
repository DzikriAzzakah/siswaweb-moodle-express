const mysql = require("mysql2/promise");

let db = null;
let connectionInitialized = false;

const InitConnectionDatabase = async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    db = conn;
    connectionInitialized = true;

    await conn.ping();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDb = () => {
  if (!connectionInitialized) {
    InitConnectionDatabase()
    // throw new Error(
    //   "Database connection is not initialized. Call InitConnectionDatabase() first."
    // );
  }
  return db;
};

module.exports = { InitConnectionDatabase, getDb };
