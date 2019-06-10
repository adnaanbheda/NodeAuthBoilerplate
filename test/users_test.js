const mongoose = require('mongoose');
const Helper = require('./test_helper');
const assert = require('assert')
const Users = Helper.Users;
const Orders = Helper.Orders;
const jsonify = require('../utility/jsonify');
const populate = require('../utility/populateUtil');
describe("User Test Initiated", () => {
    it("Create a user with an order", async () => {
        const user = await Users.create({});
        const order = await Orders.create({});
        user.orderlist.push(order);
        await user.save();
        const query = await Users.findOne({});
        assert(query.orderlist.length === 1);
    });
    it("Populate the User with Orders", async () => {
        const user = await Users.create({
            email: "adnaan.bheda@gmail.com"
        });
        const test_orders = [
            await Orders.create({ source: "Porbandar" }),
            await Orders.create({ source: "Mumbai" })
        ];
        for (order of test_orders) {
            user.orderlist.push(order)
        }
        await user.save();
        await Orders.updateOne({ source: "Porbandar" }, {
            people: {
                client: user,
                delivery: user,
                logistics: user
            }
        });
        // console.log(user);
        const query = await Users.findOne({ email: "adnaan.bheda@gmail.com" })
            .populate(populate.people);
        assert(query.orderlist[0].people.client.email != undefined);
        assert(query.orderlist[0].people.delivery.email != undefined);
        assert(query.orderlist[0].people.logistics.email != undefined);
    });
    it("Transform Object without id and v", async () => {
        const user = await Users.create({ email: "adnaan.bheda@gmail.com" });
        const obj = user.toObject();
        assert(obj["_id"] === undefined && obj["__v"] === undefined)
    })
});