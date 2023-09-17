const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const auth = require('./middlewares/auth');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
});

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Ошибка 404. Страница не найдена' });
});

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
