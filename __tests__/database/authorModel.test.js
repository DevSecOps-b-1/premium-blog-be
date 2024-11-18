// __tests__/database/authorModel.test.js
const {
  addPost,
  editPost,
  deletePost,
  updateUserSubscription,
} = require("../../src/database/authorModel");
const pool = require("../../src/database/db"); // Import the pool to mock it

// Mock the pool.query method
jest.mock("../../src/database/db", () => ({
  query: jest.fn(),
}));

describe("Author Model Tests", () => {
  // Test for addPost
  describe("addPost", () => {
    it("should add a new post and return the created post", async () => {
      const mockTitle = "New Post";
      const mockContent = "This is a new post content";
      const mockIsPremium = false;

      // Mocking the result from pool.query for addPost
      const mockResult = {
        rows: [
          {
            id: 1,
            title: mockTitle,
            content: mockContent,
            is_premium: mockIsPremium,
            created_at: "2024-11-18T12:34:56Z",
          },
        ],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the addPost function
      const result = await addPost(mockTitle, mockContent, mockIsPremium);

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `INSERT INTO posts (title, content, is_premium, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *;`,
        [mockTitle, mockContent, mockIsPremium]
      );

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should throw an error if adding a post fails", async () => {
      const mockTitle = "New Post";
      const mockContent = "This is a new post content";
      const mockIsPremium = false;

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Verify that the function throws the error
      await expect(
        addPost(mockTitle, mockContent, mockIsPremium)
      ).rejects.toThrow("add post failed");
    });
  });

  // Test for editPost
  describe("editPost", () => {
    it("should edit an existing post and return the updated post", async () => {
      const mockPostId = 1;
      const mockTitle = "Updated Post Title";
      const mockContent = "Updated post content";
      const mockIsPremium = true;

      // Mocking the result from pool.query for editPost
      const mockResult = {
        rows: [
          {
            id: mockPostId,
            title: mockTitle,
            content: mockContent,
            is_premium: mockIsPremium,
            created_at: "2024-11-18T12:34:56Z",
          },
        ],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the editPost function
      const result = await editPost(
        mockPostId,
        mockTitle,
        mockContent,
        mockIsPremium
      );

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `UPDATE posts SET title = $1, content = $2, is_premium = $3, created_at = NOW() WHERE id = $4 RETURNING *;`,
        [mockTitle, mockContent, mockIsPremium, mockPostId]
      );

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should throw an error if editing a post fails", async () => {
      const mockPostId = 1;
      const mockTitle = "Updated Post Title";
      const mockContent = "Updated post content";
      const mockIsPremium = true;

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Verify that the function throws the error
      await expect(
        editPost(mockPostId, mockTitle, mockContent, mockIsPremium)
      ).rejects.toThrow("edit post failed");
    });
  });

  // Test for deletePost
  describe("deletePost", () => {
    it("should delete a post and return true", async () => {
      const mockPostId = 1;

      // Mocking the result from pool.query for deletePost
      pool.query.mockResolvedValue({});

      // Call the deletePost function
      const result = await deletePost(mockPostId);

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `DELETE FROM posts WHERE id = $1 RETURNING *;`,
        [mockPostId]
      );

      // Verify that the function returns true
      expect(result).toBe(true);
    });

    it("should throw an error if deleting a post fails", async () => {
      const mockPostId = 1;

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Verify that the function throws the error
      await expect(deletePost(mockPostId)).rejects.toThrow(
        "delete post failed"
      );
    });
  });

  // Test for updateUserSubscription
  describe("updateUserSubscription", () => {
    it("should update the user subscription and return the updated user", async () => {
      const mockUserId = 1;
      const mockIsPremium = true;

      // Mocking the result from pool.query for updateUserSubscription
      const mockResult = {
        rows: [
          {
            id: mockUserId,
            is_premium: mockIsPremium,
          },
        ],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the updateUserSubscription function
      const result = await updateUserSubscription(mockUserId, mockIsPremium);

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `UPDATE users SET is_premium = $1 WHERE id = $2 RETURNING *;`,
        [mockIsPremium, mockUserId]
      );

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should throw an error if updating the user subscription fails", async () => {
      const mockUserId = 1;
      const mockIsPremium = true;

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Verify that the function throws the error
      await expect(
        updateUserSubscription(mockUserId, mockIsPremium)
      ).rejects.toThrow("update subscriber failed");
    });
  });
});
