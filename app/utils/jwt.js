const jwt = require("jsonwebtoken");

const GenerateJWT = (data) => {
  try {
    const token = jwt.sign(
      {
        user: data,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ValidateAndDecodeJWT = (token) => {
  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    return decodedJWT;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { GenerateJWT, ValidateAndDecodeJWT };
