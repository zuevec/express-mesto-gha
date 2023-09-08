const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getUser = (req, res) => {
  if (req.params.userId.length === 24) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
          return;
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          res.status(404).send({ message: 'Пользователь по указанному _id не найден.', err });
        } else {
          res.status(500).send({ message: 'На сервере произошла ошибка', err });
        }
      });
  } else {
    res.status(400).send({ message: 'Некорректный _id пользователя' });
  }
};

module.exports.editUserData = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(404).send({ message: 'Пользователь по указанному _id не найден.', err });
        }
      });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.editUserAvatar = (req, res) => {
  if (req.user._id) {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
    )
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(404).send({ message: 'Пользователь по указанному _id не найден.', err });
        }
      });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
