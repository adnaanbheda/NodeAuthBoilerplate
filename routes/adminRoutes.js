const express = require('express')
const apiRoutes = express.Router()

//Protected Route
apiRoutes.use(require('../middleware/verifyToken'));

apiRoutes.get('/hello', (req, res) => {
    res.send({
        message: "Hello ADMIN"
    })
})


module.exports = apiRoutes