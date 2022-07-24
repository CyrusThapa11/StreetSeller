const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_URI);

    console.log(`mongodb connected, ${conn.connection.host}`);
  } catch (error) {
    console.log("ERROR IS ", error.message);
  }
};
module.exports = connectDB;
