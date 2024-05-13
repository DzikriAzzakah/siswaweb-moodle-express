const { ValidateAndDecodeJWT } = require("../utils/jwt");

const VerifyJWTMiddleware = async (req, res, next) => {
  try {
    const checkAuthorization = req.headers.authorization;

    if (!checkAuthorization) {
      res.statusCode = 400;
      return next(new Error("No Access Token Provided"));
    }
    const getToken = checkAuthorization.split(" ")[1];

    const decodedJWT = ValidateAndDecodeJWT(getToken);

    req.authorizedUser = decodedJWT.user;
    next();
  } catch (e) {
    return next(new Error(e));
  }
};

module.exports = { VerifyJWTMiddleware };
