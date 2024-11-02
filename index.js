// initialization
const express = require("express");
const http = require("http");
const { createTables } = require("./database/createTables");
const {
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

// instantiation
const app = express();
const server = http.createServer(app);

// middleware
app.use(express.json());

// route
app.get("/", async (req, res) => {
  await createTables();
  res.send("Tables created!");
});

// =============TES AUTHOR================
// create author
app.post("/create-author", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await createAuthorUser(username, email, password);
  res.send(result);
});

// add post
app.post("/add-post", async (req, res) => {
  const { title, content, isPremium } = req.body;
  const result = await addPost(title, content, isPremium);
  res.send(result);
});

// edit post
app.post("/edit-post", async (req, res) => {
  const { postId, title, content, isPremium } = req.body;
  const result = await editPost(postId, title, content, isPremium);
  res.send(result);
});

// delete post
app.post("/delete-post", async (req, res) => {
  const { postId } = req.body;
  const result = await deletePost(postId);
  res.send(result);
});

// update subscription
app.post("/update-user-subscribtion", async (req, res) => {
  const { userId, isPremium } = req.body;
  const result = await updateUserSubscription(userId, isPremium);
  res.send(result);
});

// ============TES AUTHENTICATION==================
// register user
// perlu dibenahin returnnya
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await registerUser(username, email, password);
  res.send(result);
});

// login user
// perlu dibenahin returnnya
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.send(result);
});

// ==============TES POST==========================
// get all psots
app.get("/get-posts", async (req, res) => {
  const result = await getPostList();
  res.send(result);
});

// get single post
app.post("/view-post", async (req, res) => {
  const { postId, isPremiumUser } = req.body;
  const result = await viewSinglePost(postId, isPremiumUser);
  res.send(result);
});

// get comments
app.get("/get-comments", async (req, res) => {
  const { postId } = req.body;
  const result = await getComments(postId);
  res.send(result);
});

// =============TES USER==============
// add comment
app.post("/add-comment", async (req, res) => {
  const { postId, usreId, commentText } = req.body;
  const result = await addComment(postId, usreId, commentText);
  res.send(result);
});

// get user
app.post("/get-userstatus", async (req, res) => {
  const { identifier } = req.body;
  const result = await getUserStatus(identifier);
  res.send(result);
});

createTables()
  .then(() => {
    // listen
    const PORT = 3001;
    server.listen(PORT, () => {
      console.log(`sever listen on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection failed");
    console.log(err);
  });
