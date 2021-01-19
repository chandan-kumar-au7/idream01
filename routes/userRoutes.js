const express = require("express");

// const passport = require("passport");
// require("../config/passport");

const userController = require("../controllers/userControllers");

const router = express.Router();

router.post("/googlelogin", userController.googlelogin);

router.post("/varifytoken", userController.varifytoken);

module.exports = router;
