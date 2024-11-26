// create the controller functions based on the routes.js file and reflecting the database/userModel.js comment section
const { sendSuccess, sendError } = require("../utils/server/send");
const { addComment } = require("../database/userModel");

const addCommentController = async (req, res) => {
  try {
    const { postId, userId, commentText } = req.body;
    const result = await addComment(postId, userId, commentText);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

module.exports = {
  addCommentController,
};
