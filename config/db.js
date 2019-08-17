const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    });
    console.log("connected to mongoDB");
  } catch (err) {
    console.log("Error Occured while connecting DB : ", err);
  }
};

module.exports = connectDB;
