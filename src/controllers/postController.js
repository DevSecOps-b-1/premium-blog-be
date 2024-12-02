// create the controller functions based on the index.js file
const { 
  sendSuccess,
  sendError } = require("../utils/server/send");
const {
  getPostList,
  viewSinglePost,
  getComments,
} = require("../database/postModel");

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
    const { postId } = req.body;
    const { userId, is_premium } = req.user; // from JWT

    if (!postId) {
      throw new Error("Post ID is required");
    }

    // Fetch the post based on the user's premium status
    const result = await viewSinglePost(postId, is_premium);
    if (!result) {
      throw new Error("Post not found or unavailable for your access level");
    }

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
  getCommentsController,
};
