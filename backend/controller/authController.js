const User = require("../models/userModel");
const { fetchBuyer, addBuyer } = require("./buyerController");
const { addVendor, fetchVendor } = require("./vendorController");

exports.signup = async (req, res) => {
  try {
    var user = await User.create(req.body); // bson

    var profile = {
      username: user.username,
      email: user.email,
      userId: user._id,
      role: user.role,
      phoneNumber: user.phoneNumber,
      fullName: user.firstName + " " + user.lastName,
    };
    var userProfile = null;
    if (user.role === "buyer") var userProfile = await addBuyer(profile);
    if (user.role === "vendor") var userProfile = await addVendor(profile);

    res.status(200).json({
      status: "success",
      data: {
        user: userProfile,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    var { email, password } = req.body;
    //check if user & email exists
    if (!email || !password) {
      res.status(404).json({
        status: "error",
        error: "please enter email and password",
      });
    }
    var user = await User.findOne({ email }).select("+password");
    var passwordVerified = await user.passwordVerification(
      password,
      user.password
    );
    if (!passwordVerified || !user) {
      res.status(401).json({
        status: "error",
        error: "Invalid email or password",
      });
    }
    var userProfile = null;
    if (user.role === "buyer") userProfile = await fetchBuyer(user._id);
    if (user.role === "vendor") userProfile = await fetchVendor(user._id);
    res.status(200).json({
      status: "success",
      data: {
        user: userProfile,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
