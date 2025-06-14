const express = require('express');
const route = express.Router();
const authController = require('../controllers/auth.controller');

route.post('/register', authController.register);

route.post('/login', authController.login);

module.exports = route;