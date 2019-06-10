const Users = require('../models/User');
module.exports = (user) => {
    user = user.toObject({})
    delete user._id
    delete user.__v
    return user;
}