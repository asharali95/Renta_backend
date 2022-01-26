const User = require("../models/userModel");
const { addVendor } = require("./vendorController");

exports.signup = async (req, res) => {
  try {
    var user = await User.create(req.body); // bson
    console.log(user);
    //profile creation
    var profile = {
      username: user.username,
      email: user.email,
      userId: user._id,
      role: user.role,
      phoneNumber: user.phoneNumber,
      fullName: user.firstName + " " + user.lastName,
    };
    var userProfile = null;
    // if (user.role === "buyer") var userProfile = await addBuyer(profile);
    if (user.role === "vendor") var userProfile = await addVendor(profile);
    console.log(userProfile);
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

exports.login = (req, res) => {
  try {
  } catch (error) {}
};
