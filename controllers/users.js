const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const {
  ERROR_INCORRECT_ADD_USER_DATA,
  ERROR_EMAIL_ALREADY_REGISTERED,
  ERROR_USER_NOT_FOUND,
  ERROR_INCORRECT_USER_DATA,
  ERROR_INCORRECT_UPDATE_USER_DATA,
  STATUS_CREATED,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(STATUS_CREATED).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(ERROR_INCORRECT_ADD_USER_DATA));
      } if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new ConflictError(ERROR_EMAIL_ALREADY_REGISTERED));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV !== 'production' ? 'giper-ultra-super-puper-secret' : process.env.JWT_SECRET, { expiresIn: '7d' });

      res.send({
        token,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getCurrentUserById = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(ERROR_USER_NOT_FOUND));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(ERROR_INCORRECT_USER_DATA));
      }
      return next(err);
    });
};

const updateProfileUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return next(new NotFoundError(ERROR_USER_NOT_FOUND));
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(ERROR_INCORRECT_UPDATE_USER_DATA));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  updateProfileUser,
  login,
  getCurrentUserById,
};
