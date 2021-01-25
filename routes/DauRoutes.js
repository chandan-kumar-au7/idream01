const express = require("express");

const DauControllers = require("../controllers/DauControllers");

const router = express.Router();

router.post("/getdau", DauControllers.GetDau);

module.exports = router;
