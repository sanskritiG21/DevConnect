const dotenv = require("dotenv");

const config = dotenv.config();

if (config.error) {
  throw new Error("Couldn't load the .env file");
}

module.exports = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  JWT_PASS: process.env.JWT_PASS,
};
