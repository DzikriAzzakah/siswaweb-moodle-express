const { UserService } = require("../services/user");
const { validationResult } = require("express-validator");

const CreateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = await req.body;
    const user = {
      username: username,
      password: password,
    };

    const result = await UserService.CreateUser(user);

    res.status(201).json({
      message: "Success create user",
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const GetAllUser = async (req, res, next) => {
  try {
    const result = await UserService.GetAllUser();

    res.status(200).json({
      message: "Success get all user",
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const GetDetailUserById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = await req.params;

    const result = await UserService.GetDetailUserById(id);

    res.status(200).json({
      message: "Success get user",
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateUserById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = await req.params;
    const { username, password } = await req.body;
    const user = {
      username: username,
      password: password,
    };

    const result = await UserService.UpdateUserById(id, user);

    res.status(200).json({
      message: "Success update user",
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const DeleteUserById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = await req.params;

    const result = await UserService.DeleteUserById(id);

    res.status(200).json({
      message: "Success delete user",
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  UserController: {
    CreateUser,
    GetAllUser,
    GetDetailUserById,
    UpdateUserById,
    DeleteUserById,
  },
};
