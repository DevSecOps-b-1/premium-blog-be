const express = require("express");
const router = express.Router();
const { createTables } = require("./src/database/authorModel");
const {
  addPostController,
  editPostController,
  deletePostController,
  updateUserSubscriptionController,
} = require("./src/controllers/authorPostController");
const {
  registerController,
  loginController,
} = require("./src/controllers/authController");
const {
  getPostListController,
  viewSinglePostController,
  getCommentsController,
} = require("./src/controllers/postController");
const {
  createAuthorUserController,
} = require("./src/controllers/authorUserController");
const { sendSuccess } = require("./src/utils/server/send");
const {
  getUserStatusController,
  addCommentController,
} = require("./src/controllers/userActivityController");

// Route to initialize tables
router.get("/", async (req, res) => {
  await createTables();
  res.send("Tables created!");
});

// Ping test
router.get("/ping", async (req, res) => {
  return sendSuccess(res, 200, { message: "pong" });
});

// Author routes
router.post("/create-author", createAuthorUserController);

router.post("/add-post", addPostController);
router.post("/edit-post", editPostController);
router.post("/delete-post", deletePostController);
router.post("/user-buy-premium", buyPremiumController);

// Authentication routes
router.post("/register", registerController);
router.post("/login", loginController);

// Post routes
router.get("/get-posts", getPostListController);
router.post("/view-post", viewSinglePostController);
router.post("/get-comments", getCommentsController);

// User routes
router.post("/add-comment", addCommentController);
router.post("/get-userstatus", getUserStatusController);

module.exports = router;
