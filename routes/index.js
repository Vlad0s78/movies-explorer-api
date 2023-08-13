const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { linkRegExp } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

const {
  ERROR_PAGE_NOT_FOUND,
} = require('../utils/constants');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().optional().min(2).max(30),
    about: Joi.string().optional().min(2).max(30),
    avatar: Joi.string().optional().pattern(linkRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use('*', (req, res, next) => {
  const error = new NotFoundError(ERROR_PAGE_NOT_FOUND);
  next(error);
});

module.exports = router;
