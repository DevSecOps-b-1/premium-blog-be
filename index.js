const express = require("express");
const http = require("http");
const router = require("./routes");

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use("/", router);

const { createTables } = require("./src/database/createTables");
createTables()
  .then(() => {
    const PORT = 3001;
    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection failed:", err);
  });
