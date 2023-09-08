const router = require('express').Router();

const {
  getUsers, getUser, createUser, editUserData, editUserAvatar,
} = require('../controlletrs/users');

router.post('/', createUser);

router.get('/', getUsers);
router.get('/:userId', getUser);

router.patch('/me', editUserData);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
