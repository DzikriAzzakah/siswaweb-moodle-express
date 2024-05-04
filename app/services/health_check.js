const { getDb } = require("../utils/db");
const { getMoodleDb } = require("../utils/moodle_db");

const HealthCheck = async () => {
  try {
    const db = getDb();
    const moodleDB = getMoodleDb();

    let isOK = await db.ping();
    if (isOK) {
      isOK = await moodleDB.ping();
      if (isOK) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { HealthCheckService: { HealthCheck } };
