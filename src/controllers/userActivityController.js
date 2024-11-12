// create the user controller from add comment and get-userstatus from index.js to replicate in here
const { addComment, getUserStatus } = require("../database/userModel");
const { sendSuccess } = require("../utils/server/send");

const addCommentController = async (req, res) => {
  const { postId, userId, commentText } = req.body;
  const result = await addComment(postId, userId, commentText);
  return sendSuccess(res, 200, result);
};

const getUserStatusController = async (req, res) => {
  const { identifier } = req.body;
  const result = await getUserStatus(identifier);
  return sendSuccess(res, 200, result);
};

module.exports = { addCommentController, getUserStatusController };
