// create the controller functions based on the index.js file
const { sendSuccess, sendError } = require("../utils/server/send");
const {
  getPostList,
  viewSinglePost,
  getComments,
} = require("../database/postModel");
const { getUserStatus } = require("../database/userModel");
const { verifyToken } = require("../utils/encryption/jwt");

// get all posts
const getPostListController = async (_, res) => {
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
    const result = await viewSinglePost(postId);

    // if is premium and user isn't premium by query inside, then throw error
    const token = req.headers.authorization.split(" ")[1];
    const { id: userId } = await verifyToken(token);
    const { is_premium } = await getUserStatus(userId);
    if (!is_premium) {
      throw new Error("You need to be premium to view this post.");
    }
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 403, error.message);
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
