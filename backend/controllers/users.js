const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  NotFoundError,
  NotAuthorizedError,
} = require('../utils/error');

const { NODE_ENV, JWT_SECRET } = process.env;
let secret = JWT_SECRET;

if (NODE_ENV !== 'production') {
  if (!JWT_SECRET) {
    secret = 'some-secret-key';
  }
} else if (!JWT_SECRET) {
  throw new Error('Не указан ключ');
}

function getUserss(req, res, next) {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({ ...(user.toObject()), password: undefined }))
    .catch(next);
}

function getOneUser(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send(user);
    })
    .catch(next);
}

function getCurrentUser(req, res) {
  req.params.userId = req.user._id;
  getOneUser(req, res);
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send(user);
    })
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send(user);
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  let userId = null;
  User.findOne({ email }).select('password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign({ _id: userId }, secret, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
      return res.send({ email });
    })
    .catch(() => {
      next(new NotAuthorizedError());
    });
}

function logout(req, res) {
  res.clearCookie('jwt');
  res.end();
}

module.exports = {
  getUserss,
  createUser,
  getOneUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  login,
  logout,
};
