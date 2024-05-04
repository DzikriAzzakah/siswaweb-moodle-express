const GlobalErrorMiddleware = (err, req, res, next) => {
  const getStatCode = res.statusCode !== 200 ? res.statusCode : 500;
  return res.status(getStatCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = GlobalErrorMiddleware;
