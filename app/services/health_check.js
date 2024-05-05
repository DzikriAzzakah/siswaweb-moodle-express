const { getDb } = require("../utils/db");
const { getMoodleDb } = require("../utils/moodle_db");

const HealthCheck = async () => {
  let db = null;
  let moodleDB = null;
  try {
    const poolMain = getDb();
    const poolMoodle = getMoodleDb();

    db = await poolMain.getConnection();
    moodleDB = await poolMoodle.getConnection();

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
  } finally {
    db.release();
    moodleDB.release();
  }
};

module.exports = { HealthCheckService: { HealthCheck } };
