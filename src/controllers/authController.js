const jwt = require("jsonwebtoken");
const getSecret = require("../utils/server/secret");
const { sendSuccess, sendError } = require("../utils/server/send");
const { registerUser, loginUser } = require("../database/authModel");

// Get the JWT secret
const secretKey = getSecret("JWT_SECRET", "JWT_SECRET_FILE");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await registerUser(username, email, password);
    return sendSuccess(res, 200, result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    
    if (!result || result.length <= 0) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT
    const payload = {
      userId: result.id,
      email: result.email,
      is_premium: result.is_premium,
      is_author: result.is_author,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });

    return sendSuccess(res, 200, token);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
}

module.exports = {
  registerController,
  loginController
};