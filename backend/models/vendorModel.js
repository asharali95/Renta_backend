const mongoose = require("mongoose");

// Schema of Vendor

const vendorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  shopAddress: {
    type: String,
    unique: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
  },

  cnicNumber: {
    type: Number,
    unique: [true, "CNIC is already taken"],
    maxLength: [13, "CNIC is too long"],
  },
});

const Vendor = new mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
