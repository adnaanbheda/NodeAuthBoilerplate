const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    role_name: {
        type: String
    }
});

module.exports = Roles = mongoose.model("roles", RoleSchema);