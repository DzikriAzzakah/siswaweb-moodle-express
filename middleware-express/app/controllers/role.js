const { RoleService } = require("../services/role");

const GetAllRole = async (req, res, next) => {
  try {
    const results = await RoleService.GetAllRole();

    res.status(200).json({
      message: "success get all roles",
      data: results,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  RoleController: {
    GetAllRole,
  },
};
