const dotenv = require('dotenv');

dotenv.config();

const config = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT || 3030,
}

module.exports = config;