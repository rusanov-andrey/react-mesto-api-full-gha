const jwt = require('jsonwebtoken');

const { NotAuthorizedError } = require('../utils/error');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new NotAuthorizedError());
  }

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new NotAuthorizedError());
  }

  req.user = payload;
  return next();
};
