const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { varifytoken } = require("./controllers/userControllers");

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
var dau = require("./routes/DauRoutes");

app.use((req, res, next) => {
  console.log(` Method : ${req.method} , End-Point : ${req.url}`);
  next();
});

app.get("/", varifytoken, (req, res) => {
  res.json({
    message: "Hello There !",
  });
});

// ------------------------All Routes will be used here --------------------------|

// app.use(passport.initialize());

app.use("/user", user);
app.use("/dau", dau);

app.use((req, res, next) => {
  res.json({
    status_code: 404,
    error: `YOU did Something WRONG ! Sorry, Try Again !`,
  });
  next();
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
