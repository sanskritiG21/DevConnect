const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    // here we are connecting to the cluster if we dont name anything after '/' || if we add the database name after the '/' then will connect to specific database
    "mongodb+srv://Sanskriti:21sanskriti@namastenode.hodnj.mongodb.net/devConnect"
  );
};

module.exports = {
  connectDB,
};
