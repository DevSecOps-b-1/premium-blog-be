// __tests__/controllers/postController.test.js
const {
  getPostListController,
  viewSinglePostController,
  getCommentsController,
} = require("../../src/controllers/postController");
const { sendSuccess, sendError } = require("../../src/utils/server/send");
const {
  getPostList,
  viewSinglePost,
  getComments,
} = require("../../src/database/postModel");

// Mock the database functions and send functions to isolate the controller logic
jest.mock("../../src/database/postModel");
jest.mock("../../src/utils/server/send");

describe("Post Controller Tests", () => {
  // Test for getPostListController
  describe("getPostListController", () => {
    it("should call sendSuccess with the list of posts", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock getPostList to return a list of posts
      const mockResponse = [
        {
          id: 1,
          title: "First Post",
          content: "This is the content of the first post",
          is_premium: true,
          created_at: "2024-11-18T12:34:56Z",
        },
        {
          id: 2,
          title: "Second Post",
          content: "Content of second post",
          is_premium: true,
          created_at: "2024-11-18T12:34:56Z",
        },
      ];
      getPostList.mockResolvedValue(mockResponse);

      // Call the controller
      await getPostListController(req, res);

      // Check if sendSuccess was called with the right arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, mockResponse);
    });

    it("should call sendError if getting posts fails", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock getPostList to throw an error
      const errorMessage = "Failed to fetch posts";
      getPostList.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await getPostListController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });

  // Test for viewSinglePostController
  describe("viewSinglePostController", () => {
    it("should call sendSuccess with the post data", async () => {
      const req = {
        body: {
          postId: 1,
          isPremiumUser: false,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock viewSinglePost to return a single post
      const mockResponse = {
        id: 1,
        title: "First Post",
        content: "This is the content of the first post",
        created_at: "2024-11-18T12:34:56Z",
      };
      viewSinglePost.mockResolvedValue(mockResponse);

      // Call the controller
      await viewSinglePostController(req, res);

      // Check if sendSuccess was called with the right arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, mockResponse);
    });

    it("should call sendError if viewing post fails", async () => {
      const req = {
        body: {
          postId: 1,
          isPremiumUser: false,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock viewSinglePost to throw an error
      const errorMessage = "Failed to fetch the post";
      viewSinglePost.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await viewSinglePostController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });

  // Test for getCommentsController
  describe("getCommentsController", () => {
    it("should call sendSuccess with the list of comments and their respective usernames", async () => {
      const req = {
        body: {
          postId: 1, // You can customize this as needed
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock getComments to return a list of comments, including the username
      const mockResponse = [
        {
          id: 1,
          comment_text: "This is a comment",
          created_at: "2024-11-18T12:34:56Z",
          username: "user1",
        },
        {
          id: 2,
          comment_text: "Another comment",
          created_at: "2024-11-18T12:34:56Z",
          username: "user2",
        },
      ];
      getComments.mockResolvedValue(mockResponse);

      // Call the controller
      await getCommentsController(req, res);

      // Check if sendSuccess was called with the right arguments
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, mockResponse);
    });

    it("should call sendError if getting comments fails", async () => {
      const req = {
        body: {
          postId: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock getComments to throw an error
      const errorMessage = "Failed to fetch comments";
      getComments.mockRejectedValue(new Error(errorMessage));

      // Call the controller
      await getCommentsController(req, res);

      // Check if sendError was called with the correct message
      expect(sendError).toHaveBeenCalledWith(res, 400, errorMessage);
    });
  });
});
