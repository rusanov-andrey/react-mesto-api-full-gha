const allowedCors = [
  'https://mestof.rusanovandrey.nomoredomainsrocks.ru',
  'http://mestof.rusanovandrey.nomoredomainsrocks.ru',
  'https://www.mestof.rusanovandrey.nomoredomainsrocks.ru',
  'http://www.mestof.rusanovandrey.nomoredomainsrocks.ru',
  'localhost:3000',
];

function checkOrijin(req, res, next) {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
}

function checkHeaders(req, res, next) {
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
}

module.exports = {
  checkOrijin,
  checkHeaders,
};
