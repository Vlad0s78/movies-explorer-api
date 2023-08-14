const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { linkRegExp } = require('../utils/constants');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegExp),
    trailerLink: Joi.string().required().pattern(linkRegExp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(linkRegExp),
    movieId: Joi.number().required(),
  }),
}), authMiddleware, createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}), authMiddleware, deleteMovie);

module.exports = router;
