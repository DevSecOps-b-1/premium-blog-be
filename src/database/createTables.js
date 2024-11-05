const pool = require("./db");

// SQL queries to create tables
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE,
    is_author BOOLEAN DEFAULT false
  );
`;

const createPostsTable = `
  CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    content TEXT NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const createCommentsTable = `
  CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Function to create all tables
module.exports.createTables = async () => {
  try {
    await pool.query(createUsersTable);
    console.log("Users table created");

    await pool.query(createPostsTable);
    console.log("Posts table created");

    await pool.query(createCommentsTable);
    console.log("Comments table created");

    console.log("All tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
    throw new Error(err);
  }
};
