const mongoose = require('mongoose');
const express = require('express');
const apiRoutes = express.Router();
const authController = require('../controllers/authController')


apiRoutes.get('/setup', authController.Setup);
apiRoutes.post('/login', authController.LoginUser)
apiRoutes.post('/register', authController.RegisterUser)


module.exports = apiRoutes