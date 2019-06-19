const express = require('express');
const apiRoutes = express.Router();
const userController = require('../controllers/userController');

//Protected Route
apiRoutes.use(require('../middleware/verifyToken'));
apiRoutes.use(require('../middleware/accountVerification'));
apiRoutes.get('/hello', (req, res) => {
    res.send({
        message: "Hello User"
    });
});

apiRoutes.get('/orders', userController.GetOrderList);
apiRoutes.post('/forgot', userController.ForgotPassword);
apiRoutes.get('/orders', userController.CreateOrder);
apiRoutes.post('/orders/create', userController.CreateOrder);
apiRoutes.delete('/orders/{id}', userController.DeleteOrder);


module.exports = apiRoutes;

