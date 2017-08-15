const express = require('express');
const router = express.Router();

const { asyncMiddleware } = require('./../middleware/handle-async')
const { register, login, logout } = require('./../controllers/auth-controller');

router.post('/register', asyncMiddleware(register));
//router.post('/login', login);

module.exports = router;