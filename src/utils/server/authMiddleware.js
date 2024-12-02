const jwt = require("jsonwebtoken");
const { sendError } = require("./send"); 

const secretKey = getSecret("JWT_SECRET", "JWT_SECRET_FILE");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return sendError(res, 401, "Authorization token required");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return sendError(res, 403, "Invalid or expired token");
  }
};

module.exports = { authenticateUser };
