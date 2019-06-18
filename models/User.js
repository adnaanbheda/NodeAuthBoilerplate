const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const util = require('../utility');
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = Schema({
    name: {
        type: String,
        default: "John Doe"
    },
    password: {
        type: String,
        default: "password",
    },
    email: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true
    },
    orderlist: [{
        type: Schema.Types.ObjectId,
        ref: "orders"
    }],
    googleID: {
        type: String,
        unique: true,
        sparse: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    token: String
});

UserSchema.pre("save", function (next) {
    var user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.isValidPassword = util.comparePassword;

if (!UserSchema.options.toObject) UserSchema.options.toObject = {};
UserSchema.options.toObject.transform = function (doc, ret, options) {
    // remove the _id of every document before returning the result
    delete ret._id;
    delete ret.__v;
    delete ret.verified;
    delete ret.token;
    delete ret.password;
    return ret;
}

UserSchema.plugin(uniqueValidator);
module.exports = Users = mongoose.model('users', UserSchema);