const pool = require("./db");

// Get Post List
const getPostList = async () => {
  try {
    const query = `SELECT * FROM posts`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.log("get post list failed");
    console.log(error);
    throw new Error("get post list failed");
  }
};

// View Single Post
const viewSinglePost = async (postId) => {
  try {
    const query = `SELECT id, title, content, created_at, is_premium FROM posts WHERE id = $1;`;
    const result = await pool.query(query, [postId]);
    return result.rows[0];
  } catch (error) {
    console.log("get single post failed");
    console.log(error);
    throw new Error("get single post failed");
  }
};

// Get Comments from Post
const getComments = async (postId) => {
  try {
    const query = `SELECT c.id, c.comment_text, c.created_at, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = $1 ORDER BY c.created_at ASC;`;
    const result = await pool.query(query, [postId]);
    return result.rows;
  } catch (error) {
    console.log("get comments failed");
    console.log(error);
    throw new Error("get comments failed");
  }
};

module.exports = { getPostList, viewSinglePost, getComments };
