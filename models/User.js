const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = Schema({
    name: {
        type: String,
        default: "John Doe"
    },
    password: {
        type: String,
        default: "password"
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    orderlist: [{
        type: Schema.Types.ObjectId,
        ref: "orders"
    }],
    googleID: {
        type: String,
        unique: true
    }
});


UserSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash
            next();
        });

    });
});

if (!UserSchema.options.toObject) UserSchema.options.toObject = {};
UserSchema.options.toObject.transform = function (doc, ret, options) {
    // remove the _id of every document before returning the result
    delete ret._id;
    delete ret.__v;
    return ret;
}

module.exports = Users = mongoose.model('users', UserSchema)