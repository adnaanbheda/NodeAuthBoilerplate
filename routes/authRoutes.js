const mongoose = require('mongoose');
const express = require('express');
const apiRoutes = express.Router();
const authController = require('../controllers/authController')


apiRoutes.get('/setup', authController.Setup);
apiRoutes.post('/login', authController.LoginUser);
apiRoutes.get('/wipe', authController.Wipe);
apiRoutes.post('/register', authController.RegisterUser);
apiRoutes.get('/reset', authController.ResetPasswordPage);
apiRoutes.post('/reset', authController.ResetPassword);
apiRoutes.get('/verify', authController.Verify);
module.exports = apiRoutes;