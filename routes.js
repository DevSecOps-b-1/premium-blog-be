const express = require("express");
const router = express.Router();
const {
  createTables,
  addPost,
  editPost,
  deletePost,
  updateUserSubscription,
} = require("./models/authorModel");
const { createAuthorUser } = require("./database/createAuthor");
const { registerUser, loginUser } = require("./models/authModel");
const {
  getPostList,
  viewSinglePost,
  getComments,
} = require("./models/postModel");
const { addComment, getUserStatus } = require("./models/userModel");

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

router.post("/add-post", async (req, res) => {
  const { title, content, isPremium } = req.body;
  const result = await addPost(title, content, isPremium);
  res.send(result);
});

router.post("/edit-post", async (req, res) => {
  const { postId, title, content, isPremium } = req.body;
  const result = await editPost(postId, title, content, isPremium);
  res.send(result);
});

router.post("/delete-post", async (req, res) => {
  const { postId } = req.body;
  const result = await deletePost(postId);
  res.send(result);
});

router.post("/update-user-subscribtion", async (req, res) => {
  const { userId, isPremium } = req.body;
  const result = await updateUserSubscription(userId, isPremium);
  res.send(result);
});

// Authentication routes
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await registerUser(username, email, password);
  res.send(result);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.send(result);
});

// Post routes
router.get("/get-posts", async (req, res) => {
  const result = await getPostList();
  res.send(result);
});

router.post("/view-post", async (req, res) => {
  const { postId, isPremiumUser } = req.body;
  const result = await viewSinglePost(postId, isPremiumUser);
  res.send(result);
});

router.get("/get-comments", async (req, res) => {
  const { postId } = req.body;
  const result = await getComments(postId);
  res.send(result);
});

// User routes
router.post("/add-comment", async (req, res) => {
  const { postId, userId, commentText } = req.body;
  const result = await addComment(postId, userId, commentText);
  res.send(result);
});

router.post("/get-userstatus", async (req, res) => {
  const { identifier } = req.body;
  const result = await getUserStatus(identifier);
  res.send(result);
});

module.exports = router;
