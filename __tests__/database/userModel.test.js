// __tests__/database/userActivityModel.test.js
const { addComment, getUserStatus } = require("../../src/database/userModel");
const pool = require("../../src/database/db"); // Import the pool to mock it

// Mock the pool.query method
jest.mock("../../src/database/db", () => ({
  query: jest.fn(),
}));

describe("User Activity Model Tests", () => {
  // Test for addComment
  describe("addComment", () => {
    it("should add a comment and return the new comment ID", async () => {
      const mockPostId = 1;
      const mockUserId = 2;
      const mockCommentText = "This is a comment";

      // Mocking the result from pool.query for addComment
      const mockResult = {
        rows: [{ id: 1 }],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the addComment function
      const result = await addComment(mockPostId, mockUserId, mockCommentText);

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `INSERT INTO comments (post_id, user_id, comment_text) VALUES ($1, $2, $3) RETURNING id;`,
        [mockPostId, mockUserId, mockCommentText]
      );

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should throw an error if adding a comment fails", async () => {
      const mockPostId = 1;
      const mockUserId = 2;
      const mockCommentText = "This is a comment";

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Verify that the function throws the error
      await expect(
        addComment(mockPostId, mockUserId, mockCommentText)
      ).rejects.toThrow("add comment failed");
    });
  });

  // Test for getUserStatus
  describe("getUserStatus", () => {
    it("should return user status by user ID", async () => {
      const mockUserId = 1;

      // Mocking the result from pool.query for getUserStatus
      const mockResult = {
        rows: [{ is_premium: true, is_author: false }],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the getUserStatus function with user ID
      const result = await getUserStatus(mockUserId);

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `SELECT is_premium, is_author FROM users WHERE id = $1;`,
        [mockUserId]
      );

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should return user status by user email", async () => {
      const mockEmail = "test@example.com";

      // Mocking the result from pool.query for getUserStatus
      const mockResult = {
        rows: [{ is_premium: false, is_author: true }],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the getUserStatus function with email
      const result = await getUserStatus(mockEmail);

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `SELECT is_premium, is_author FROM users WHERE email = $1;`,
        [mockEmail]
      );

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should throw an error if getting user status fails", async () => {
      const mockIdentifier = "test@example.com";

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Verify that the function throws the error
      await expect(getUserStatus(mockIdentifier)).rejects.toThrow(
        "getUsersStatus failed"
      );
    });
  });
});
