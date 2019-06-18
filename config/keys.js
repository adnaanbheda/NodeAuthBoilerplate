
if (process.env.NODE_ENV != 'production') {
    const keys = require('./dev')
    module.exports = keys;
}
else {
    module.exports = {
        mongoURI: process.env.MONGO_URI,
        secret: process.env.SECRET
    }
}