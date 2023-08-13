const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/errorMiddleware');

require('dotenv').config();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cors());

app.use(helmet());
app.use(limiter());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Слушаемый порт: ${PORT}`);
});
