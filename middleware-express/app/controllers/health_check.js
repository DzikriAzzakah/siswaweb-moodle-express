const { HealthCheckService } = require("../services/health_check");

const HealthCheck = async (req, res, next) => {
  try {
    const isOK = await HealthCheckService.HealthCheck();
    if (!isOK) {
      res.status(422).json({
        message: "Not OK",
        success: false,
      });
    }

    res.status(200).json({
      message: "OK",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  HealthCheckController: {
    HealthCheck,
  },
};
