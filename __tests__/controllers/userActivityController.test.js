// __tests__/controllers/userActivityController.test.js
const {
  addCommentController,
  getUserStatusController,
} = require("../../src/controllers/userActivityController");
const { sendSuccess, sendError } = require("../../src/utils/server/send");
const { addComment, getUserStatus } = require("../../src/database/userModel");

// Mock the database functions and send functions to isolate the controller logic
jest.mock("../../src/database/userModel");
jest.mock("../../src/utils/server/send");

describe("User Activity Controller Tests", () => {
  // Test for addCommentController
  describe("addCommentController", () => {
    it("should call sendSuccess with the correct data on successful comment addition", async () => {
      const req = {
        body: {
          postId: 1,
          userId: 1,
          commentText: "This is a comment",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock addComment to return the expected result
      const mockResponse = {
        id: 1,
      };
      addComment.mockResolvedValue(mockResponse);

      // Call the controller
      const miaw = await addCommentController(req, res);

      // Check if sendSuccess was called with the correct arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, mockResponse);
    });

    it("should call sendError if adding comment fails", async () => {
      const req = {
        body: {
          postId: 1,
          userId: 1,
          commentText: "This is a comment",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock addComment to throw an error
      const errorMessage = "Failed to add comment";
      addComment.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await addCommentController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });

  // Test for getUserStatusController
  describe("getUserStatusController", () => {
    it("should call sendSuccess with the user status", async () => {
      const req = {
        body: {
          identifier: "user1@mail.com",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock getUserStatus to return the expected user status
      const mockResponse = { is_premium: true, is_author: false };
      getUserStatus.mockResolvedValue(mockResponse);

      // Call the controller
      await getUserStatusController(req, res);

      // Check if sendSuccess was called with the correct arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, mockResponse);
    });

    it("should call sendError if getting user status fails", async () => {
      const req = {
        body: {
          identifier: "user1@mail.com",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock getUserStatus to throw an error
      const errorMessage = "Failed to retrieve user status";
      getUserStatus.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await getUserStatusController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });
});
