const { GenerateJWT } = require("../utils/jwt");
const authenticateAPI = require("../requesters/authenticate");

const Login = async (request) => {
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
    };

    const accessToken = GenerateJWT(jwtPayload);

    return accessToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  AuthService: {
    Login,
  },
};
