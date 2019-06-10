const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PointSchema = require('./PointSchema');
const LocationUpdateSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    dateModified: Date
});
const OrderSchema = Schema({
    source: {
        type: String
    },
    destination: {
        type: String
    },
    currentLocation: PointSchema,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    people: {
        client: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        logistics: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        delivery: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
    },
    locationUpdates: [{
        type: LocationUpdateSchema,
        ref: "locationupdates"
    }]
});


OrderSchema.pre("save", () => {
});

module.exports = Orders = mongoose.model("orders", OrderSchema)