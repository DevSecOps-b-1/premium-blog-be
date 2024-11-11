const { sendSuccess, sendError } = require("../utils/server/send");
const { updateUserSubscription } = require("../database/userModel");

const buyPremiumController = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await updateUserSubscription(userId, true);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};