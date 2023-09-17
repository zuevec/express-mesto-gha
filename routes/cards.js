const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlPattern = require('../constant');

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controlletrs/cards');

router.get('/cards', getCards);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }).unknown(true),
}), deleteCard);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlPattern).required(),
  }).unknown(true),
}), createCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).alphanum().required(),
  }).unknown(true),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).alphanum().required(),
  }).unknown(true),
}), dislikeCard);

module.exports = router;
