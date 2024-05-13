const bcrypt = require("bcrypt");

const HashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const CompareHashPassword = async (hash, password) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { HashPassword, CompareHashPassword };
