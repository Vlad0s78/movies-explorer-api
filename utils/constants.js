const linkRegExp = /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_CONFLICT = 409;
const STATUS_SERVER_ERROR = 500;

const ERROR_INVALID_AUTH_CREDENTIALS = 'Ошибка: неверные почта или пароль';
const ERROR_USER_NOT_FOUND = 'Ошибка: пользователь не найден';
const ERROR_INCORRECT_USER_DATA = 'Ошибка: некорректные данные пользователя';//++
const ERROR_INCORRECT_UPDATE_USER_DATA = 'Ошибка: некорректные данные при обновлении профиля';
const ERROR_INCORRECT_MOVIE_DATA = 'Ошибка: некорректные данные при добавлении фильма';
const ERROR_MOVIE_NOT_FOUND = 'Ошибка: фильм не найден';
const ERROR_NO_RIGHTS_TO_DELETE_MOVIE = 'Ошибка: недостаточно прав для удаления фильма';
const ERROR_EMAIL_ALREADY_REGISTERED = 'Ошибка: пользователь с таким email уже зарегистрирован';
const ERROR_INCORRECT_ADD_USER_DATA = 'Ошибка: некорректные данные при создании пользователя';
const ERROR_UNAUTHORIZED_ACCESS = 'Ошибка: требуется авторизация';
const ERROR_INVALID_TOKEN_ERROR = 'Ошибка: Неверный токен авторизации';
const ERROR_PAGE_NOT_FOUND = 'Ошибка: Страница не найдена';

module.exports = {
  linkRegExp,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT,
  STATUS_SERVER_ERROR,
  ERROR_INVALID_AUTH_CREDENTIALS,
  ERROR_USER_NOT_FOUND,
  ERROR_INCORRECT_USER_DATA,
  ERROR_INCORRECT_UPDATE_USER_DATA,
  ERROR_INCORRECT_MOVIE_DATA,
  ERROR_MOVIE_NOT_FOUND,
  ERROR_NO_RIGHTS_TO_DELETE_MOVIE,
  ERROR_EMAIL_ALREADY_REGISTERED,
  ERROR_INCORRECT_ADD_USER_DATA,
  ERROR_UNAUTHORIZED_ACCESS,
  ERROR_INVALID_TOKEN_ERROR,
  ERROR_PAGE_NOT_FOUND,
};
