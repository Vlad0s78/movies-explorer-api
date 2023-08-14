const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  ERROR_UNAUTHORIZED_ACCESS,
  ERROR_INVALID_TOKEN_ERROR,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(ERROR_UNAUTHORIZED_ACCESS));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'giper-ultra-super-puper-secret');
  } catch (error) {
    return next(new UnauthorizedError(ERROR_INVALID_TOKEN_ERROR));
  }
  req.user = payload;
  return next();
};

module.exports = authMiddleware;
