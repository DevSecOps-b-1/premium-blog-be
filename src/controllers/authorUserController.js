// based on index.js file and /create-author endpoint, replicate as the controller
const { sendSuccess, sendError } = require("../utils/server/send");
const { createAuthorUser } = require("../database/createAuthor");

const createAuthorUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await createAuthorUser(username, email, password);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

module.exports = {
  createAuthorUserController
};