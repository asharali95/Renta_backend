const Vendor = require("../models/vendorModel");

exports.addVendor = async (userProfile) => {
  try {
    var vendor = await Vendor.create(userProfile);
    return vendor;
  } catch (error) {
    return error.message;
  }
};
