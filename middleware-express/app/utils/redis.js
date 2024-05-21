const { createClient } = require("redis");

let db = null;
let connectionInitialized = false;

const InitConnectionRedis = async () => {
  try {
    const client = await createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    })
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    db = client;
    connectionInitialized = true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRedis = () => {
  if (!connectionInitialized) {
    InitConnectionRedis();
  }
  return db;
};

module.exports = { InitConnectionRedis, getRedis };
