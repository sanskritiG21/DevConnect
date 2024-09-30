const mongoose = require("mongoose");
const config = require(".");

const connectDB = async () => {
  await mongoose.connect(
    // here we are connecting to the cluster if we dont name anything after '/' || if we add the database name after the '/' then will connect to specific database
    config.DB_URL
  );
};

module.exports = {
  connectDB,
};
