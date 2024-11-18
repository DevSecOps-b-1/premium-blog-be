// __tests__/controllers/authorUserController.test.js
const {
  createAuthorUserController,
} = require("../../src/controllers/authorUserController");
const { sendSuccess, sendError } = require("../../src/utils/server/send");
const { createAuthorUser } = require("../../src/database/createAuthor");

// Mock the functions to avoid calling the actual database or sending real responses
jest.mock("../../src/database/createAuthor");
jest.mock("../../src/utils/server/send");

describe("Author User Controller Tests", () => {
  // Test for createAuthorUserController
  describe("createAuthorUserController", () => {
    it("should call sendSuccess with correct data on successful user creation", async () => {
      const req = {
        body: {
          username: "newauthor",
          email: "newauthor@example.com",
          password: "password123",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock createAuthorUser to return the expected user object
      const mockResponse = {
        id: 1,
        username: "newauthor",
        email: "newauthor@example.com",
      };
      createAuthorUser.mockResolvedValue(mockResponse);

      // Call the controller
      await createAuthorUserController(req, res);

      // Check if sendSuccess was called with the correct arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, mockResponse);
    });

    it("should call sendError if user creation fails", async () => {
      const req = {
        body: {
          username: "newauthor",
          email: "newauthor@example.com",
          password: "password123",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock createAuthorUser to throw an error
      const errorMessage = "Failed to create author user";
      createAuthorUser.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await createAuthorUserController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });
});
