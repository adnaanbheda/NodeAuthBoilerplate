const mongoose = require('mongoose');
const keys = require('../config/dev');
const Users = require('../models/User')
const Orders = require('../models/Order');
mongoose.set('useCreateIndex', true);

before((done) => {
    mongoose.connect(keys.mongoURI + "_test", { useNewUrlParser: true })
        .then(() => {
            require('../utility/loadModels')();
            done();
        });
});

beforeEach(async () => {
    const { users, orders } = mongoose.connection.collections;
    try {
        await users.drop();
        await orders.drop();
    } catch (err) {
        console.log(err);
    }
});
module.exports = {
    Users,
    Orders
}