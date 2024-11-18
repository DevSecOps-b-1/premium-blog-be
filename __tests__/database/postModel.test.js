// __tests__/database/postModel.test.js
const {
  getPostList,
  viewSinglePost,
  getComments,
} = require("../../src/database/postModel");
const pool = require("../../src/database/db"); // Import the pool to mock it

// Mock the pool.query method
jest.mock("../../src/database/db", () => ({
  query: jest.fn(),
}));

describe("Post Model Tests", () => {
  // Test for getPostList
  describe("getPostList", () => {
    it("should return a list of posts", async () => {
      // Mocking the result from pool.query for getPostList
      const mockResult = {
        rows: [
          {
            id: 1,
            title: "First Post",
            content: "This is the content of the first post",
            created_at: "2024-11-18T12:34:56Z",
            is_premium: false,
          },
          {
            id: 2,
            title: "Second Post",
            content: "This is the content of the second post",
            created_at: "2024-11-18T13:34:56Z",
            is_premium: true,
          },
        ],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the getPostList function
      const result = await getPostList();

      // Verify that the query was called with the correct SQL
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM posts");

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows);
    });

    it("should throw an error if getting the post list fails", async () => {
      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Verify that the function throws the error
      await expect(getPostList()).rejects.toThrow("get post list failed");
    });
  });

  // Test for viewSinglePost
  describe("viewSinglePost", () => {
    it("should return a single post if the user has access", async () => {
      const mockPostId = 1;
      const mockIsPremiumUser = true;

      // Mocking the result from pool.query for viewSinglePost
      const mockResult = {
        rows: [
          {
            id: mockPostId,
            title: "First Post",
            content: "This is the content of the first post",
            created_at: "2024-11-18T12:34:56Z",
          },
        ],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the viewSinglePost function
      const result = await viewSinglePost(mockPostId, mockIsPremiumUser);

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `SELECT id, title, content, created_at FROM posts WHERE id = $1 AND (is_premium = FALSE OR (is_premium = TRUE AND $2 = TRUE));`,
        [mockPostId, mockIsPremiumUser]
      );

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should throw an error if getting the single post fails", async () => {
      const mockPostId = 1;
      const mockIsPremiumUser = true;

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Verify that the function throws the error
      await expect(
        viewSinglePost(mockPostId, mockIsPremiumUser)
      ).rejects.toThrow("get single post failed");
    });
  });

  // Test for getComments
  describe("getComments", () => {
    it("should return a list of comments for a given post", async () => {
      const mockPostId = 1;

      // Mocking the result from pool.query for getComments
      const mockResult = {
        rows: [
          {
            id: 1,
            comment_text: "This is a comment",
            created_at: "2024-11-18T12:34:56Z",
            username: "user1",
          },
          {
            id: 2,
            comment_text: "This is another comment",
            created_at: "2024-11-18T13:00:00Z",
            username: "user2",
          },
        ],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the getComments function
      const result = await getComments(mockPostId);

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `SELECT c.id, c.comment_text, c.created_at, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = $1 ORDER BY c.created_at ASC;`,
        [mockPostId]
      );

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows);
    });

    it("should throw an error if getting comments fails", async () => {
      const mockPostId = 1;

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Verify that the function throws the error
      await expect(getComments(mockPostId)).rejects.toThrow(
        "get comments failed"
      );
    });
  });
});
