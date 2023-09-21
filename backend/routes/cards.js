const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const v = require('../validators/validators').validator;
const {
  getCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: v.card.name,
    link: v.card.link,
  }).unknown(true),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: v._id,
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: v._id,
  }),
}), addLike);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: v._id,
  }),
}), deleteLike);

module.exports = router;
