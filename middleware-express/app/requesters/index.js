const axios = require("axios");

const BaseAPI = axios.create({
  baseURL: process.env.AUTHENTICATE_URL,
});

module.exports = {
  BaseAPI,
};
