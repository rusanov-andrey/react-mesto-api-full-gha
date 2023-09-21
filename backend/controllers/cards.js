const Card = require('../models/card');
const {
  NotFoundError,
  ForbidenError,
  CommonError,
} = require('../utils/error');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(new CommonError(err.name));
    });
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }

      if (card.owner.toString() !== req.user._id) {
        throw new ForbidenError();
      }

      return Card.deleteOne(card);
    })
    .then((card) => {
      if (!res.writableEnded) {
        res.send(card);
      }
    })
    .catch(next);
}

function addLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      res.send(card);
    })
    .catch(next);
}

function deleteLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      res.send(card);
    })
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
