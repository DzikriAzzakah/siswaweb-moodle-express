const mysql = require("mysql2/promise");

let db = null;
let connectionInitialized = false;

const InitConnectionDatabase = async () => {
  try {
    const conn = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitingForConnection: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    db = conn;
    connectionInitialized = true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDb = () => {
  if (!connectionInitialized) {
    InitConnectionDatabase();
  }
  return db;
};

module.exports = { InitConnectionDatabase, getDb };
