const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { postSigninValidation, postSignupValidation } = require('./middlewares/auth_validation');
const { NotFoundError } = require('./utils/error');
const errorHandler = require('./middlewares/error_handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/signin', postSigninValidation(), login);
app.post('/signup', postSignupValidation(), createUser);

app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server B+F started');
});
