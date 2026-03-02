const mongoose = require("mongoose");

exports.connectDB = async (uri) => {
  await mongoose.connect(uri);
  console.log("MongoDB Connected");
};