const { sendSuccess, sendError } = require("../utils/server/send");
const { registerUser, loginUser } = require("../database/authModel");
const bcrypt = require("bcrypt");
const { encryptPassword } = require("../utils/encryption/bcrypt");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // secure password first
    const enc_pass = await encryptPassword(password);

    const result = await registerUser(username, email, enc_pass);
    return sendSuccess(res, 200, {
      "message": "Registered successfully, you can now login.",
    });
  } catch (error) {
    return sendError(res, 409, "Email already registered, please register with another email.");
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email);
    
    if (!result || result.length <= 0) {
      throw new Error("Invalid email or password");
    }

    // check the password
    const valid_pass = await bcrypt.compare(password, result.password).then((res) => res).catch(err => err);
    if (!valid_pass) {
      throw new Error("Invalid email or password");
    }
    return sendSuccess(res, 200, {"id": result.id});
  } catch (error) {
    return sendError(res, 400, error.message);
  }
}

module.exports = {
  registerController,
  loginController
};