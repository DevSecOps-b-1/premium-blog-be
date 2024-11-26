// create the user controller from add comment and get-userstatus from index.js to replicate in here
const { addComment, getUserStatus } = require("../database/userModel");
const { sendSuccess, sendError } = require("../utils/server/send");

const addCommentController = async (req, res) => {
  try {
    const { postId, userId, commentText } = req.body;
    const result = await addComment(postId, userId, commentText);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

const getUserStatusController = async (req, res) => {
  try {
    const { identifier } = req.body;
    const result = await getUserStatus(identifier);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

module.exports = { addCommentController, getUserStatusController };
