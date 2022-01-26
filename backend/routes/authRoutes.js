const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/:token", resetPassword);

module.exports = router;
