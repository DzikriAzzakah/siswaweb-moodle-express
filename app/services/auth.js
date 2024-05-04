const { getDb } = require("../utils/db");
const { CompareHashPassword } = require("../utils/crypt");
const { GenerateJWT } = require("../utils/jwt");

const Login = async (request) => {
  try {
    const db = getDb();
    const sqlCheckUserByUsername = `
      SELECT id,username,password FROM users WHERE username = ?
    `;
    const valueCheckUserByUsername = [request.username];

    const [rows] = await db.execute(
      sqlCheckUserByUsername,
      valueCheckUserByUsername
    );

    if (rows.length < 1) {
      throw new Error("username or password invalid");
    }

    if (!(await CompareHashPassword(rows[0].password, request.password))) {
      throw new Error("username or password invalid");
    }

    const jwtPayload = {
      id: rows[0].id,
      username: rows[0].username,
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
