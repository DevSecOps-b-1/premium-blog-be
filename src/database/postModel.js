const pool = require("./db");

// Get Post List
const getPostList = async () => {
  try {
    const query = `SELECT id, title, is_premium, created_at FROM posts`;
    const result = await pool.query(query);

    // Process each post to add trimmed content
    const posts = await Promise.all(
      result.rows.map(async (post) => {
        const contentQuery = `SELECT content FROM posts WHERE id = $1`;
        const contentResult = await pool.query(contentQuery, [post.id]);

        if (contentResult.rows.length > 0) {
          let content = contentResult.rows[0].content;

          // Trim content to a maximum of 183 characters and clean it up
          const trimmedContent = content
            .slice(0, 183) // Limit to 183 characters
            .replace(/[\s,]+$/, ""); // Remove trailing whitespaces or symbols

          return { ...post, content: trimmedContent };
        }
        return post;
      })
    );

    return posts;
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
