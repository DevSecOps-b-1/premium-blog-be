const pool = require("./db");

// Function to create a new author user
async function createAuthorUser(username, email, password) {
  const insertAuthorUserQuery = `
    INSERT INTO users (username, email, password, is_premium, is_author)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [username, email, password, true, true]; // is_premium: false, is_author: true

  try {
    const result = await pool.query(insertAuthorUserQuery, values);
    console.log("Author user created:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating author user:", error);
    throw error;
  }
}

module.exports = { createAuthorUser };
