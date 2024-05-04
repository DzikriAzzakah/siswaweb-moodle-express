const { AuthService } = require("../services/auth");
const { validationResult } = require("express-validator");

const Login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = await req.body;
    const request = {
      username: username,
      password: password,
    };

    const result = await AuthService.Login(request);

    res.status(200).json({
      message: "Success login",
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AuthController: {
    Login,
  },
};
