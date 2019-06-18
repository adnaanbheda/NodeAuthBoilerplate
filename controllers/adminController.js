const mongoose = require('mongoose');
const Orders = mongoose.model('orders');
const Users = mongoose.model('users');
module.exports = {
    async WipeData(req, res) {
        try {
            await Orders.db.dropCollection();
            await Users.db.dropCollection();
        }
        catch (error) {
            res.sendStatus(500);
        }
        res.sendStatus(200);
    },
}