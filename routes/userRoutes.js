const mongoose = require('mongoose');
const express = require('express');
const apiRoutes = express.Router();
const userController = require('../controllers/userController');
const Users = mongoose.model('users');

//Protected Route
apiRoutes.use(require('../middleware/verifyToken'));

apiRoutes.get('/hello', (req, res) => {
    res.send({
        message: "Hello User"
    })
});


apiRoutes.get('/orders', userController.GetOrderList);

module.exports = apiRoutes

