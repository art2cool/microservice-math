const express = require('express');
const router = express.Router();

const { getUserById, getUsers, createUser, removeUser, updateUser } = require('./../controllers/users-controller');

router.get('/:id', getUserById);
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);

module.exports = router;