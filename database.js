const dotEnv = require("dotenv");
dotEnv.config();

const mongoose = require("mongoose");

const databse = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(
      `Databse connection established through port ${conn.connection.host}`
    );
  } catch (error) {
    console.log("Databse connection cannot be established");
  }
};

module.exports = databse;
