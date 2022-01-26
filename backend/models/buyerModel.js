const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
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

  residentialAddress: {
    type: String,
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

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
