// __tests__/controllers/authController.test.js
const {
  registerController,
  loginController,
} = require("../../src/controllers/authController");
const { sendSuccess, sendError } = require("../../src/utils/server/send");
const { registerUser, loginUser } = require("../../src/database/authModel");

// Mock the functions to avoid calling the actual database or sending real responses
jest.mock("../../src/database/authModel");
jest.mock("../../src/utils/server/send");

describe("Auth Controller Tests", () => {
  describe("registerController", () => {
    it("should call sendSuccess with correct data on successful registration", async () => {
      const req = {
        body: {
          username: "testuser",
          email: "test@example.com",
          password: "password123",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock registerUser to simulate a successful registration
      registerUser.mockResolvedValue({
        id: 1,
        username: "testuser",
        email: "test@example.com",
      });

      // Call the controller
      await registerController(req, res);

      // Check if sendSuccess was called with the right arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      });
    });

    it("should call sendError if registration fails", async () => {
      const req = {
        body: {
          username: "testuser",
          email: "test@example.com",
          password: "password123",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock registerUser to throw an error
      const errorMessage = "Email already exists";
      registerUser.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await registerController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });

  describe("loginController", () => {
    it("should call sendSuccess with correct data on successful login", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock loginUser to simulate a successful login
      loginUser.mockResolvedValue({
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      // Call the controller
      await loginController(req, res);

      // Check if sendSuccess was called with the right arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should call sendError if login fails (invalid credentials)", async () => {
      const req = {
        body: {
          email: "wrong@example.com",
          password: "wrongpassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock loginUser to simulate invalid login
      loginUser.mockResolvedValue([]);

      // Call the controller
      await loginController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(
        res,
        400,
        "Invalid email or password"
      );
    });
  });
});
