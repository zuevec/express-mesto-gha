const router = require('express').Router();

const urlPattern = require('../constant');
const {
  createUser,
} = require('../controlletrs/users');
const { celebrate, Joi } = require('celebrate');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().min(3),
  }).unknown(true),
}), createUser);

module.exports = router;
