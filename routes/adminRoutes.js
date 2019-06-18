const express = require('express')
const apiRoutes = express.Router()
const adminController = require('../controllers/adminController');
//Protected Route
apiRoutes.use(require('../middleware/verifyToken'));

apiRoutes.get('/hello', (req, res) => {
    res.send({
        message: "Hello ADMIN"
    })
});

apiRoutes.get('/wipe', adminController.WipeData);


module.exports = apiRoutes