// __tests__/database/createAuthor.test.js
const { createAuthorUser } = require("../../src/database/createAuthor");
const pool = require("../../src/database/db"); // Import the pool to mock it

// Mock the pool.query method
jest.mock("../../src/database/db", () => ({
  query: jest.fn(),
}));

describe("Create Author User Model Tests", () => {
  // Test for createAuthorUser
  describe("createAuthorUser", () => {
    it("should create a new author user and return user data", async () => {
      const mockUsername = "authorUser";
      const mockEmail = "author@example.com";
      const mockPassword = "securepassword123";

      // Mocking the result from pool.query for createAuthorUser
      const mockResult = {
        rows: [
          {
            id: 1,
            username: mockUsername,
            email: mockEmail,
            is_author: true,
          },
        ],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the createAuthorUser function
      const result = await createAuthorUser(
        mockUsername,
        mockEmail,
        mockPassword
      );

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO users (username, email, password, is_premium, is_author) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, is_author;",
        [mockUsername, mockEmail, mockPassword, true, true]
      );

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should throw an error if creating an author user fails", async () => {
      const mockUsername = "authorUser";
      const mockEmail = "author@example.com";
      const mockPassword = "securepassword123";

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Verify that the function throws the error
      await expect(
        createAuthorUser(mockUsername, mockEmail, mockPassword)
      ).rejects.toThrow("Error creating author user");
    });
  });
});
