const mongoose = require('mongoose');
const keys = require('../config/dev');
const Users = require('../models/User');
const request = require("supertest");
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
        await mongoose.connection.db.dropDatabase();

    } catch (err) {
        // console.log(err);
    }
});

async function Login(app, data) {
    return new Promise(resolve => {
        request(app)
            .post('/api/login')
            .set('Accept', 'application/json')
            .send(data)
            .expect(200)
            .then((res) => {
                return resolve(res);
            });
    });
}
module.exports = {
    Users,
    Orders,
    Login
}