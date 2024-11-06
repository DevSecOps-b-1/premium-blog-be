const pool = require("./db");

// Add a new post
const addPost = async (title, content, isPremium = false) => {
  try {
    const query = `
          INSERT INTO posts (title, content, is_premium, created_at)
          VALUES ($1, $2, $3, NOW()) RETURNING *;
        `;
    const values = [title, content, isPremium];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log("add post failed");
    console.log(error);
  }
};

// Edit an existing post by ID
const editPost = async (postId, title, content, isPremium) => {
  try {
    const query = `
            UPDATE posts
            SET title = $1, content = $2, is_premium = $3, created_at = NOW()
            WHERE id = $4 RETURNING *;
          `;
    const values = [title, content, isPremium, postId];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log("edit post failed");
    console.log(error);
  }
};

// Delete a post by ID
const deletePost = async (postId) => {
  try {
    const query = `
            DELETE FROM posts WHERE id = $1 RETURNING *;
          `;
    const result = await pool.query(query, [postId]);
    console.log("delete successfull");
    return true;
  } catch (error) {
    console.log("delete post failed");
    console.log(error);
    return false;
  }
};

// Update user subscription to premium
const updateUserSubscription = async (userId, isPremium) => {
  try {
    const query = `
            UPDATE users
            SET is_premium = $1
            WHERE id = $2 RETURNING *;
          `;
    const result = await pool.query(query, [isPremium, userId]);
    return result.rows[0];
  } catch (error) {
    console.log("update subscriber failed");
    console.log(error);
  }
};

module.exports = { addPost, editPost, deletePost, updateUserSubscription };
