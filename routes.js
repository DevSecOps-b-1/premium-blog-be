const express = require("express");
const router = express.Router();
const { createTables} = require("./models/authorModel");
const { createAuthorUser } = require("./database/createAuthor");
const { addComment, getUserStatus } = require("./models/userModel");
const { addPostController, editPostController, deletePostController, updateUserSubscriptionController } = require("./src/controllers/authorPostController");
const { registerController, loginController } = require("./src/controllers/authController");
const { getPostListController, viewSinglePostController, getCommentsController } = require("./src/controllers/postController");

// Route to initialize tables
router.get("/", async (req, res) => {
  await createTables();
  res.send("Tables created!");
});

// Author routes
router.post("/create-author", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await createAuthorUser(username, email, password);
  res.send(result);
});

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
