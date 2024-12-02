const { sendSuccess, sendError } = require("../utils/server/send");
const { updateUserSubscription } = require("../database/authorModel");
const { verifyToken } = require("../utils/encryption/jwt");

const updateUserSubscriptionController = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("No token provided");
    }
    const token = req.headers.authorization.split(" ")[1];
    const { id: userId } = await verifyToken(token);
    const { isPremium } = req.body;
    const result = await updateUserSubscription(userId, isPremium);
    return sendSuccess(res, 200, {
      "message": `Premium status for this user is now ${result.is_premium}`
    });
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

module.exports = { updateUserSubscriptionController };