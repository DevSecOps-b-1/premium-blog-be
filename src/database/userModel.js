const pool = require("./db");

// Add Comment
const addComment = async (postId, userId, commentText) => {
  try {
    const query = `
            INSERT INTO comments (post_id, user_id, comment_text)
            VALUES ($1, $2, $3)
            RETURNING id;
          `;
    const result = await pool.query(query, [postId, userId, commentText]);
    return result.rows[0];
  } catch (error) {
    console.log("add comment failed");
    console.log(error);
  }
};

// Get user information by ID or email
const getUserStatus = async (identifier) => {
  try {
    let query;
    let values;

    // Check if identifier is email or id
    if (typeof identifier === "number") {
      query = `SELECT is_premium, is_author FROM users WHERE id = $1;`;
      values = [identifier];
    } else {
      query = `SELECT is_premium, is_author FROM users WHERE email = $1;`;
      values = [identifier];
    }

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log("getUsersStatus failed");
    console.log(error);
  }
};

module.exports = { getUserStatus, addComment };
