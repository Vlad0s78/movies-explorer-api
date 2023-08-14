const allowedCors = [
  'http://api.filmhub.nomoreparties.co',
  'https://api.filmhub.nomoreparties.co',
  'http://localhost:3000',
  'https://localhost:3000',
];

const cors = (req, res, next) => {
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    });
  }

  if (method === 'OPTIONS') {
    res.header({
      'Access-Control-Allow-Headers': requestHeaders,
      'Access-Control-Allow-Methods': DEFAULT_ALLOWED_METHODS,
    });
    return res.end();
  }
  return next();
};

module.exports = cors;
