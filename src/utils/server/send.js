const sendSuccess = (res, statusCode, data) => {
  const payload = {
    'success': true,
    'statusCode': statusCode,
    ...data
  };
  
  return res.status(statusCode).json(payload);
}

const sendError = (res, statusCode, message) => {
  const payload = {
    'success': false,
    'statusCode': statusCode,
    'message': message
  };

  return res.status(statusCode).json(payload);
}

module.exports = {
  sendSuccess,
  sendError
}