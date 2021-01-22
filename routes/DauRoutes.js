const express = require("express");

const DauControllers = require("../controllers/DauControllers");

const router = express.Router();

router.get("/getdau", DauControllers.GetDau);

module.exports = router;
