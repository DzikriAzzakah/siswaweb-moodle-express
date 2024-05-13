const mysql = require("mysql2/promise");

let moodleDB = null;
let connectionInitialized = false;

const InitConnectionDatabaseMoodle = async () => {
  try {
    const conn = await mysql.createPool({
      host: process.env.DB_MDL_HOST,
      user: process.env.DB_MDL_USER,
      password: process.env.DB_MDL_PASSWORD,
      database: process.env.DB_MDL_NAME,
      waitingForConnection: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    moodleDB = conn;
    connectionInitialized = true;

    // await conn.ping();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getMoodleDb = () => {
  if (!connectionInitialized) {
    InitConnectionDatabaseMoodle();
    // throw new Error(
    //   "Database connection is not initialized. Call InitConnectionDatabaseMoodle() first."
    // );
  }
  return moodleDB;
};

module.exports = { InitConnectionDatabaseMoodle, getMoodleDb };
