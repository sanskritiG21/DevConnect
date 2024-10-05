const mongoose = require("mongoose");
const { DB_URL } = require("./envConfig");

const connectDB = async () => {
  await mongoose.connect(
    // here we are connecting to the cluster if we dont name anything after '/' || if we add the database name after the '/' then will connect to specific database
    DB_URL
  );
};

module.exports = {
  connectDB,
};
