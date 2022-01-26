const Buyer = require("./../models/buyerModel");

exports.addBuyer = async (userProfile) => {
  try {
    const buyer = await Buyer.create(userProfile);
    return buyer;
  } catch (error) {
    return error.message;
  }
};

exports.fetchBuyer = async (userId) => {
  try {
    const fetchedBuyer = await Buyer.findOne({ userId: userId });
    return fetchedBuyer;
  } catch (error) {
    return error.message;
  }
};
