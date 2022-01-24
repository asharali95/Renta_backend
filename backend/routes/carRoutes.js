const express = require("express");
const router = express.Router();
const { postCar } = require("../controller/carController");

router.route("/car/new").post(postCar);


module.exports = router;
