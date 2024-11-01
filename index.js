// initialization
const express = require("express");
const http = require("http");
const { createTables } = require("./database/createTables");
const { addPost } = require("./models/authorModel");
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

app.get("/create-author", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await createAuthorUser(username, email, password);
  res.send(result);
});

app.get("/add-post", async (req, res) => {
  const { title, content, isPremium } = req.body;
  const result = await addPost(title, content, isPremium);
  res.send(result);
  res.send("Add post successfull");
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
