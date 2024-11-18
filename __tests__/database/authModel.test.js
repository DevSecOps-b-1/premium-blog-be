// __tests__/database/authModel.test.js
const { registerUser, loginUser } = require("../../src/database/authModel");
const pool = require("../../src/database/db"); // Import the pool to mock it

// Mock the pool.query method
jest.mock("../../src/database/db", () => ({
  query: jest.fn(),
}));

describe("Auth Model Tests", () => {
  // Test for registerUser
  describe("registerUser", () => {
    it("should register a new user and return user data without password", async () => {
      const mockUsername = "testuser";
      const mockEmail = "test@example.com";
      const mockPassword = "password123";

      // Mocking the result from pool.query for registerUser
      const mockResult = {
        rows: [
          {
            id: 1,
            username: mockUsername,
            email: mockEmail,
          },
        ],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the registerUser function
      const result = await registerUser(mockUsername, mockEmail, mockPassword);

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `
          INSERT INTO users (username, email, password, is_premium)
          VALUES ($1, $2, $3, FALSE)
          RETURNING id, username, email;
        `,
        [mockUsername, mockEmail, mockPassword]
      );

      // Verify that the function returns the expected result
      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should handle errors and return the error object when registration fails", async () => {
      const mockUsername = "testuser";
      const mockEmail = "test@example.com";
      const mockPassword = "password123";

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Call the registerUser function
      const result = await registerUser(mockUsername, mockEmail, mockPassword);

      // Verify that the query was called with the correct SQL and parameters
      expect(pool.query).toHaveBeenCalledWith(
        `
          INSERT INTO users (username, email, password, is_premium)
          VALUES ($1, $2, $3, FALSE)
          RETURNING id, username, email;
        `,
        [mockUsername, mockEmail, mockPassword]
      );

      // Verify that the function returns the error object
      expect(result).toEqual(mockError);
    });
  });

  // Test for loginUser
  describe("loginUser", () => {
    it("should return user data for valid credentials", async () => {
      const mockEmail = "test@example.com";
      const mockPassword = "password123";

      // Mocking the result from pool.query for loginUser
      const mockResult = {
        rows: [
          {
            id: 1,
            username: "testuser",
            email: mockEmail,
            password: mockPassword, // Normally, the password wouldn't be returned like this
          },
        ],
      };
      pool.query.mockResolvedValue(mockResult);

      // Call the loginUser function
      const result = await loginUser(mockEmail, mockPassword);

      // Verify that the query was called with the correct SQL (note: vulnerable to SQL injection)
      expect(pool.query).toHaveBeenCalledWith(
        `
          SELECT id, username, email, password FROM users 
          WHERE email = '${mockEmail}' 
          AND password = '${mockPassword}';
        `
      );

      // Verify that the function returns the expected rows
      expect(result).toEqual(mockResult.rows);
    });

    it("should handle errors and return the error object when login fails", async () => {
      const mockEmail = "test@example.com";
      const mockPassword = "password123";

      // Mocking the error for pool.query
      const mockError = new Error("Database error");
      pool.query.mockRejectedValue(mockError);

      // Call the loginUser function
      const result = await loginUser(mockEmail, mockPassword);

      // Verify that the query was called with the correct SQL (note: vulnerable to SQL injection)
      expect(pool.query).toHaveBeenCalledWith(
        `
          SELECT id, username, email, password FROM users 
          WHERE email = '${mockEmail}' 
          AND password = '${mockPassword}';
        `
      );

      // Verify that the function returns the error object
      expect(result).toEqual(mockError);
    });
  });
});
