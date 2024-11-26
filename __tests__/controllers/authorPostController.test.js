// __tests__/controllers/authorPostController.test.js
const {
  addPostController,
  editPostController,
  deletePostController,
  updateUserSubscriptionController,
} = require("../../src/controllers/authorPostController");
const { sendSuccess, sendError } = require("../../src/utils/server/send");
const {
  addPost,
  editPost,
  deletePost,
  updateUserSubscription,
} = require("../../src/database/authorModel");

// Mock the functions to avoid calling the actual database or sending real responses
jest.mock("../../src/database/authorModel");
jest.mock("../../src/utils/server/send");

describe("Author Post Controller Tests", () => {
  // Test for addPostController
  describe("addPostController", () => {
    it("should call sendSuccess with correct data on successful post creation", async () => {
      const req = {
        body: {
          title: "New Post",
          content: "This is the content of the new post",
          isPremium: false,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock addPost to return the expected post object
      addPost.mockResolvedValue({
        id: 1,
        title: "New Post",
        content: "This is the content of the new post",
        is_premium: false,
        created_at: "2024-11-18T12:34:56Z",
      });

      // Call the controller
      await addPostController(req, res);

      // Check if sendSuccess was called with the right arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, {
        id: 1,
        title: "New Post",
        content: "This is the content of the new post",
        is_premium: false,
        created_at: "2024-11-18T12:34:56Z",
      });
    });

    it("should call sendError if post creation fails", async () => {
      const req = {
        body: {
          title: "New Post",
          content: "This is the content of the new post",
          isPremium: false,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock addPost to throw an error
      const errorMessage = "Failed to create post";
      addPost.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await addPostController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });

  // Test for editPostController
  describe("editPostController", () => {
    it("should call sendSuccess with correct data on successful post edit", async () => {
      const req = {
        body: {
          postId: 1,
          title: "Updated Post",
          content: "Updated content of the post",
          isPremium: true,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock editPost to return the expected updated post
      editPost.mockResolvedValue({
        id: 1,
        title: "Updated Post",
        content: "Updated content of the post",
        is_premium: true,
        created_at: "2024-11-18T12:34:56Z",
      });

      // Call the controller
      await editPostController(req, res);

      // Check if sendSuccess was called with the right arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, {
        id: 1,
        title: "Updated Post",
        content: "Updated content of the post",
        is_premium: true,
        created_at: "2024-11-18T12:34:56Z",
      });
    });

    it("should call sendError if post edit fails", async () => {
      const req = {
        body: {
          postId: 1,
          title: "Updated Post",
          content: "Updated content of the post",
          isPremium: true,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock editPost to throw an error
      const errorMessage = "Failed to update post";
      editPost.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await editPostController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });

  // Test for deletePostController
  describe("deletePostController", () => {
    it("should call sendSuccess on successful post deletion", async () => {
      const req = {
        body: {
          postId: 1,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock deletePost to return true on success
      deletePost.mockResolvedValue(true);

      // Call the controller
      await deletePostController(req, res);

      // Check if sendSuccess was called with the right arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, true);
    });

    it("should call sendError if post deletion fails", async () => {
      const req = {
        body: {
          postId: 1,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock deletePost to throw an error
      const errorMessage = "Failed to delete post";
      deletePost.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await deletePostController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });

  // Test for updateUserSubscriptionController
  describe("updateUserSubscriptionController", () => {
    it("should call sendSuccess with correct data on successful subscription update", async () => {
      const req = {
        body: {
          userId: 1,
          isPremium: true,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock updateUserSubscription to return the updated user
      updateUserSubscription.mockResolvedValue({ id: 1, isPremium: true });

      // Call the controller
      await updateUserSubscriptionController(req, res);

      // Check if sendSuccess was called with the right arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, {
        id: 1,
        isPremium: true,
      });
    });

    it("should call sendError if subscription update fails", async () => {
      const req = {
        body: {
          userId: 1,
          isPremium: true,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock updateUserSubscription to throw an error
      const errorMessage = "Failed to update subscription";
      updateUserSubscription.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await updateUserSubscriptionController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });
});
