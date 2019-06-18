const mongoose = require('mongoose');
const Users = mongoose.model('users');
const util = require('../utility');
module.exports = async (req, res, next) => {
    const app = require('../server');
    let id = req.decoded.id;
    const user = await Users.findById(id);
    if (!user.verified) {
        return res.status(403).send(util.message(false, "Your account isn't verified. To proceed, verify your account"));
    } else {
        next();
    }
}