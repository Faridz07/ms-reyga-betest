const jwt = require('jsonwebtoken');
const buildResponse = require('../utils/responseBuilder');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return buildResponse(res, 401, 'Unauthorized');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return buildResponse(res, 403, 'Unauthorized');
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;