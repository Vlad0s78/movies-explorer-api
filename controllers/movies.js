const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  ERROR_INCORRECT_MOVIE_DATA,
  ERROR_MOVIE_NOT_FOUND,
  ERROR_NO_RIGHTS_TO_DELETE_MOVIE,
  STATUS_CREATED,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(ERROR_INCORRECT_MOVIE_DATA));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(ERROR_MOVIE_NOT_FOUND));
      }

      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(ERROR_NO_RIGHTS_TO_DELETE_MOVIE));
      }

      return movie.deleteOne();
    })
    .then((deletedMovie) => {
      if (!deletedMovie) {
        return next(new NotFoundError(ERROR_MOVIE_NOT_FOUND));
      }
      res.send(deletedMovie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(ERROR_INCORRECT_MOVIE_DATA));
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
