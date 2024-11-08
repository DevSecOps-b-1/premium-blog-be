// create the controller functions based on the index.js file
const { sendSuccess, sendError } = require("../utils/server/send");

// get all posts
const getPostListController = async (req, res) => {
  try {
    const result = await getPostList();
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

// view single post
const viewSinglePostController = async (req, res) => {
  try {
    const { postId, isPremiumUser } = req.body;
    const result = await viewSinglePost(postId, isPremiumUser);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

// get comments
const getCommentsController = async (req, res) => {
  try {
    const { postId } = req.body;
    const result = await getComments(postId);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

module.exports = {
  getPostListController,
  viewSinglePostController,
  getCommentsController
};