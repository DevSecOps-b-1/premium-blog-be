const express = require("express");
const router = express.Router();
const { createTables} = require("./src/database/authorModel");
const { addComment, getUserStatus } = require("./src/database/userModel");
const { addPostController, editPostController, deletePostController, updateUserSubscriptionController } = require("./src/controllers/authorPostController");
const { registerController, loginController } = require("./src/controllers/authController");
const { getPostListController, viewSinglePostController, getCommentsController } = require("./src/controllers/postController");
const { createAuthorUserController } = require("./src/controllers/authorUserController");
const { sendSuccess } = require("./src/utils/server/send");

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
router.post("/update-user-subscription", updateUserSubscriptionController);

// Authentication routes
router.post("/register", registerController);
router.post("/login", loginController);

// Post routes
router.get("/get-posts", getPostListController);
router.post("/view-post", viewSinglePostController);
router.get("/get-comments", getCommentsController);

// User routes
router.post("/add-comment", addComment);
router.post("/get-userstatus", getUserStatus);

module.exports = router;
