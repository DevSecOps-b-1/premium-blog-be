const jwt = require("jsonwebtoken");
const getSecret = "../server/secret"; 

secretKey = getSecret("JWT_SECRET", "JWT_SECRET_FILE");

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

module.exports.verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};