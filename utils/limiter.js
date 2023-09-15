const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50000,
  message:
    'В настоящий момент превышено количество запросов на сервер. Повторите запрос позже.',
});

module.exports = limiter;
