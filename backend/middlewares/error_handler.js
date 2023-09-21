const {
  MestoError,
  BadRequestError,
  ConflictError,
  CommonError,
} = require('../utils/error');

/* eslint-disable no-unused-vars */
module.exports = (err, req, res, next) => {
  let finalError = new CommonError(err.name);
  if (err instanceof MestoError) {
    finalError = err;
  } else if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
    finalError = new BadRequestError();
  } else if (err.code === 11000) {
    finalError = new ConflictError();
  }

  return res.status(finalError.code).send({ message: finalError.message });
};
