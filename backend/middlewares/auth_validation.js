const { celebrate, Joi } = require('celebrate');

const v = require('../validators/validators').validator;

module.exports.postSigninValidation = () => celebrate({
  body: Joi.object().keys({
    email: v.user.email,
    password: v.user.password,
  }),
});

module.exports.postSignupValidation = () => celebrate({
  body: Joi.object().keys({
    email: v.user.email,
    password: v.user.password,
    name: v.user.name,
    about: v.user.about,
    avatar: v.user.avatar,
  }).unknown(true),
});
