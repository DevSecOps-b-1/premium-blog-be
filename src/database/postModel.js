const pool = require("./db");

// Get Post List
const getPostList = async () => {
  try {
    const query = `
          SELECT * FROM posts
        `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.log("get post list failed");
    console.log(error);
  }
};

// View Single Post
const viewSinglePost = async (postId, isPremiumUser) => {
  try {
    const query = `
            SELECT * 
            FROM posts 
            WHERE id = $1 
              AND (is_premium = FALSE OR (is_premium = TRUE AND $2 = TRUE));
          `;
    const result = await pool.query(query, [postId, isPremiumUser]);
    return result.rows[0];
  } catch (error) {
    console.log("get single post failed");
    console.log(error);
  }
};

// Get Comments from Post
const getComments = async (postId) => {
  try {
    const query = `
          SELECT c.id, c.comment_text, c.created_at, u.username 
          FROM comments c
          JOIN users u ON c.user_id = u.id
          WHERE c.post_id = $1
          ORDER BY c.created_at ASC;
        `;
    const result = await pool.query(query, [postId]);
    return result.rows;
  } catch (error) {
    console.log("get comments failed");
    console.log(error);
  }
};

module.exports = { getPostList, viewSinglePost, getComments };
