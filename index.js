const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { varifytoken } = require("./controllers/userControllers");

// const passport = require("passport");

//passport
// require("./config/passport");

dotenv.config();
const connectDB = require("./Models/Db");
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ------------------------All Routes Imported Here From All ROUTES Folder--------------------------|
var user = require("./routes/userRoutes");

app.use((req, res, next) => {
  console.log(` Method : ${req.method} , End-Point : ${req.url}`);
  next();
});

const find = (name, query, hint = {}, sort = {}, limit = 1) => {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.collection(name, (err, res) => {
      if (err) reject(err);
      resolve(
        res
          .find({ $query: query, $hint: { ...hint } })
          .sort(sort)
          .limit(limit)
          .toArray()
      );
    });
  });
};

app.get("/", varifytoken, (req, res) => {
  res.json({
    message: "Hello There !",
  });
});

// ------------------------All Routes will be used here --------------------------|

// app.use(passport.initialize());

app.use("/user", user);

app.get("/fetchdata", async function (req, res) {
  try {
    const data = await find("events", {});
    // console.log("data", data);
    res.send(data);
  } catch (err) {
    // console.log("There is some error : ", err);
    return res.send(
      "There Is Some Error Fetching The Data ! Please Try Again."
    );
  }
});

app.use((req, res, next) => {
  res.json({
    status_code: 404,
    error: `YOU did Something WRONG ! Sorry, Try Again !`,
    Next_Route1: "https://i-dream-task.herokuapp.com/",
    Next_Route2: "https://i-dream-task.herokuapp.com/fetchdata",
  });
  next();
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
