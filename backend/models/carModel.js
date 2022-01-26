const mongoose = require("mongoose");

// Schema of Car
const carSchema = new mongoose.Schema(
  {
    model: {
      type: Array,
      required: [true, "Car model is required", true],
    },

    color: {
      type: Array,
      required: true,
    },

    deliveryTime: {
      type: Date,
      required: true,
      default: Date.now(),
    },

    pickupAddress: {
      type: String,
      required: [true, "Please enter the your pickup location"],
    },

    dropAddress: {
      type: String,
      required: [true, "Please enter the your Drop location"],
    },

    pickupTime: {
      type: Date,
      required: true,
      default: Date.now(),
    },

    estimatedCost: {
      type: Number,
      required: true,
    },
  },
  {
    Timestamp: true,
  }
);

// Model of Car

const Car = new mongoose.model("Car", carSchema);
module.exports = Car;
