
if (process.env.NODE_ENV != 'production') {
    const keys = require('./dev')
    module.exports = {
        mongoURI: keys.mongoURI,
        secret: keys.secret
    }
}
else {
    module.exports = {
        mongoURI: process.env.MONGO_URI,
        secret: process.env.SECRET
    }
}