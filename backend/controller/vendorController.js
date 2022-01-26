const Vendor = require("../models/vendorModel");

exports.addVendor = async (userProfile) => {
  try {
    var vendor = await Vendor.create(userProfile);
    return vendor;
  } catch (error) {
    return error.message;
  }
};

exports.fetchVendor = async (userId) => {
  try {
    const fetchedVendor = await Vendor.findOne({ userId: userId });
    return fetchedVendor;
  } catch (error) {
    return error.message;
  }
};
