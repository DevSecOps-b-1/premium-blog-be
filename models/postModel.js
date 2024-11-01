const pool = require("../database/db");

// Get Post List
module.exports.getPostList = async (isPremiumUser) => {
  try {
    const query = `
          SELECT id, title, content, created_at 
          FROM posts 
          WHERE is_premium = FALSE 
             OR (is_premium = TRUE AND ${isPremiumUser} = TRUE);
        `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.log("get post list failed");
    console.log(error);
  }
};

// View Single Post
module.exports.viewSinglePost = async (postId, isPremiumUser) => {
  try {
    const query = `
            SELECT id, title, content, created_at 
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
module.exports.getComments = async (postId) => {
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
