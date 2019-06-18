const keys = require('./config/keys')


//Mongoose Setup

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
require('./utility/loadModels')();

//Express Setup

const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('superSecret', keys.secret);
require('./routes')(app);


if (process.env.NODE_ENV !== 'test') {

}

//Server Start

module.exports = app