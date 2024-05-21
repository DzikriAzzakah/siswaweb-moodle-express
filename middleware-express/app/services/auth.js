const { GenerateJWT } = require("../utils/jwt");
const { getRedis } = require("../utils/redis");
const authenticateAPI = require("../requesters/authenticate");

const Login = async (request) => {
  let redis = null;
  try {
    // authenticate users password to authenticate services
    const response = await authenticateAPI(request);

    // throw error when user wrong password or user not found
    if (!response.data.is_valid) {
      throw new Error("username or password invalid");
    }

    const jwtPayload = {
      id: response.data.user?.id,
      username: response.data.user?.username,
      email: response.data.user?.email,
      role_id: response.data.user?.role_id,
      role_name: response.data.user?.role_name,
      full_name: `${response.data.user?.first_name} ${response.data.user?.last_name}`,
    };

    const jwtStringify = JSON.stringify(jwtPayload);

    redis = await getRedis();

    // example set with expire duration data to redis (in seconds)
    await redis.setEx(
      `SESSION_USER:${response.data.user?.username}`,
      120,
      jwtStringify
    );

    // example get value by key
    const value = await redis.get(
      `SESSION_USER:${response.data.user?.username}`
    );

    const parsedVal = JSON.parse(value);
    console.log(parsedVal);

    const accessToken = GenerateJWT(jwtPayload);

    return accessToken;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await redis.disconnect();
  }
};

module.exports = {
  AuthService: {
    Login,
  },
};
