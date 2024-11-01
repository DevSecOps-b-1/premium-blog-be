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

app.post("/update-user-subscribtion", async (req, res) => {
  const { userId, isPremium } = req.body;
  const result = await updateUserSubscription(userId, isPremium);
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
