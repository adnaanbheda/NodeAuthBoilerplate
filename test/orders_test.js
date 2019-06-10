const Helper = require('./test_helper');
const Orders = Helper.Orders;
const Users = Helper.Users;
const assert = require('assert');
const populate = require('../utility/populateUtil');
describe("Orders model testing suite.", () => {
    it("Creating an Order", async () => {
        Orders.create({
            people: {
                client: await Users.create({
                    email: "test0@gmail.com",
                    phone: "5478654785"
                }),
                delivery: await Users.create({
                    email: "test1@gmail.com",
                    phone: "1234567891"
                }),
                logistics: await Users.create({
                    email: "test2@gmail.com",
                    phone: "1234569089"
                })
            }
        });
    });
    it("Populating users from Orders", async () => {
        await Orders.create({});
        await Users.create({
            email: "adnaan.bheda@gmail.com"
        });
        const orders = await Orders.find({});
        orders[0].people.client = await Users.findOne({ email: "adnaan.bheda@gmail.com" });
        orders[0].people.delivery = await Users.findOne({ email: "adnaan.bheda@gmail.com" });
        orders[0].people.logistics = await Users.findOne({ email: "adnaan.bheda@gmail.com" });
        await orders[0].save();
        const query = await Orders.find({}).populate(populate.order);
        const obj = query[0].people;
        assert(obj.client.email == (obj.delivery.email && obj.logistics.email));
        assert(obj.client.email != undefined);
    });

});