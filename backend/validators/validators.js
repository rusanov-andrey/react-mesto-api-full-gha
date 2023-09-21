const { Joi } = require('celebrate');

const { uriRegExp } = require('../utils/uri');

module.exports.validator = {
  _id: Joi.string().required().regex(/[\da-z]{24}/),
  user: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(uriRegExp),
  },
  card: {
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(uriRegExp),
  },
};
