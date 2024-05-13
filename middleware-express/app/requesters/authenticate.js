const { BaseAPI } = require("./index");

const authenticateAPI = (authenticateRequest) => {
  return BaseAPI.post("/authenticate", authenticateRequest);
};

module.exports = authenticateAPI;
