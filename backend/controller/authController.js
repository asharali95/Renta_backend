const User = require("../models/userModel");
const { fetchBuyer, addBuyer } = require("./buyerController");
const { addVendor, fetchVendor } = require("./vendorController");
const sendEmail = require("../utilities/Email");
const crypto = require("crypto");
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
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    var { email } = req.body;
    //1 - fetch user on the basis of email
    var user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        status: "error",
        msg: "No user found!",
      });
    }
    //2- generate reset token
    var resetToken = user.passwordResetTokenGenerator();
    await user.save({ validateBeforeSave: false }); //saving already existing doc
    console.log(resetToken);
    var message = `please click to below provided link for changing password. Note that the provided link will expire within 10 mins - localhost:8001/api/v1/auth/forgot-password/${resetToken}`;

    //3- send to user's email
    await sendEmail({
      to: email,
      subject: "password reset token",
      body: message,
    });
    console.log(user.passwordResetToken);
    res.status(200).json({
      status: "success",
      message: `reset token has been sent successfully to ${email}`,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      msg: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    var { token } = req.params;
    var { password, confirmPassword } = req.body;
    var encryptedResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    var user = await User.findOne({
      passwordResetToken: encryptedResetToken,
      passwordResetTokenExpiredAt: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({
        status: "error",
        msg: "token doesnt exist or has been expired!",
      });
    }
    //set user new password
    user.password = password;
    user.confirmPassword = confirmPassword;
    user.passwordResetToken = undefined;

    await user.save();
    res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    res.status(400).json({
      status: "error",
      msg: error.message,
    });
  }
};
