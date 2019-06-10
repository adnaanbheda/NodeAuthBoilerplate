
const Users = require('../models/User')

module.exports = {
    async GetOrderList(req, res) {
        const id = req.decoded.id;
        const user = await Users.findById(id);
    }
}