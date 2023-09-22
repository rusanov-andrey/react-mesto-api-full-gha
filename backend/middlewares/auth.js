const jwt = require('jsonwebtoken');

const { NotAuthorizedError } = require('../utils/error');

const { NODE_ENV, JWT_SECRET } = process.env;
let secret = JWT_SECRET;

if (NODE_ENV !== 'production') {
  if (!JWT_SECRET) {
    secret = 'some-secret-key';
  }
} else if (!JWT_SECRET) {
  throw Error('Не указан ключ');
}

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new NotAuthorizedError());
  }

  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    next(new NotAuthorizedError());
  }

  req.user = payload;
  return next();
};
