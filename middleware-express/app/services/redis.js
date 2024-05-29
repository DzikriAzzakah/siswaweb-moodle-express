const { getRedis } = require("../utils/redis");

const Set = async (key, ttl, value) => {
  let redis = null;
  try {
    redis = await getRedis();

    const valueStringify = JSON.stringify(value);

    // set with expire duration data to redis (in seconds)
    await redis.setEx(key, ttl, valueStringify);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const GetByKey = async (key) => {
  let redis = null;
  try {
    redis = await getRedis();

    // get value by key
    const value = await redis.get(key);
    if (!value) {
      return null;
    }

    const parsedVal = JSON.parse(value);

    return parsedVal;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  RedisService: {
    Set,
    GetByKey,
  },
};
