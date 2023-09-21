const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const v = require('../validators/validators').validator;
const {
  getUserss, createUser, getOneUser, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUserss);
router.post('/users', createUser);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: v._id,
  }),
}), getOneUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: v.user.name,
    about: v.user.about,
  }).unknown(true),
}), updateProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: v.user.avatar,
  }).unknown(true),
}), updateAvatar);

module.exports = router;
