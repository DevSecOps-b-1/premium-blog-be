const express = require("express");
const http = require("http");
const router = require("./routes");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Define CORS options
const corsOptions = {
  origin: "*", // Allow this origin. OWASP top ten
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true,
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

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
