const { RedisService } = require("../services/redis");
const { validationResult } = require("express-validator");

const Set = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { key, ttl, value } = await req.body;

    await RedisService.Set(key, ttl, value);

    res.status(200).json({
      message: "Success set data to redis",
      data: key,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const GetByKey = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { key } = await req.params;

    const result = await RedisService.GetByKey(key);

    res.status(200).json({
      message: "Success get data in redis",
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  RedisController: {
    Set,
    GetByKey,
  },
};
