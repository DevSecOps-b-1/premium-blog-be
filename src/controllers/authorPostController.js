const { sendSuccess, sendError } = require("../utils/server/send");
const { addPost, editPost, deletePost, updateUserSubscription } = require("../database/authorModel");

const addPostController = async (req, res) => {
  try {
    const { title, content, isPremium } = req.body;
    const result = await addPost(title, content, isPremium);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

const editPostController = async (req, res) => {
  try {
    const { postId, title, content, isPremium } = req.body;
    const result = await editPost(postId, title, content, isPremium);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

const deletePostController = async (req, res) => {
  try {
    const { postId } = req.body;
    const result = await deletePost(postId);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

module.exports = {
  addPostController,
  editPostController,
  deletePostController
};