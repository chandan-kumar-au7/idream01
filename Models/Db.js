// MONGO DB CONNECTION

const mongoose = require("mongoose");

const { mongouri } = process.env;

// console.log("mongouri => ", mongouri);

const connectDB = async () => {
  try {
    // Connect to database with mongoURI from environment variable

    await mongoose.connect(
      mongouri,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      (err) => {
        if (!err) return console.log("MongoDB Connection Succeeded.");
        console.log("Error in DB connection  : ", err.message);
      }
    );
  } catch (err) {
    console.log("Error as \n", err.message);
    // Exit process with failure if error
    process.exit(1);
  }
};

module.exports = connectDB;
