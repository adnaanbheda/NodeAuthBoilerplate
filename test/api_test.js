const Helper = require('./test_helper');
const request = require('supertest');
const Orders = Helper.Orders;
const Users = Helper.Users;
const assert = require('assert');
const app = require('../server');
describe("REST API Tests", () => {
    it("Login", async () => {
        await new Users({
            email: "adnaan.bheda@gmail.com",
            verified: true
        }).save();
        const res = await Helper.Login(app, {
            email: "adnaan.bheda@gmail.com",
            password: "password"
        })
        assert(res.body.success === true);
    });
    it("Register", async () => {
        const register_res = await request(app)
            .post("/api/register")
            .send({
                email: "hello@gmail.com",
                password: "adnaanbheda",
                name: "Adnaan Bheda",
            })
            .set("Accept", "application/json")
            .expect(200);
        const before_res = await Helper.Login(app, { email: "hello@gmail.com", password: "adnaanbheda" });
        assert(before_res.body.message === "Please verify your account.");
        const verify_res = await request(app)
            .get("/api/verify")
            .query({ "token": register_res.body.token })
            .expect(200);
        const after_res = await Helper.Login(app, { email: "hello@gmail.com", password: "adnaanbheda" });
        assert(after_res.body.success === true);
    });

    xit("Forget Password Routine", async () => {
        const register_res = await Helper.Register(app, {
            email: "adnaan.bheda@gmail.com",
            password: "adnaan"
        });
        let login_res = await Helper.Login(app, {
            email: "adnaan.bheda@gmail.com",
            password: "password"
        });
        const res = await request(app)
            .post("/api/user/forgot")
            .send({
                token: login_res.body.token
            })
            .set('Accept', 'application/json')
            .expect(200);
        const user = await Users.findOne({
            email: "adnaan.bheda@gmail.com"
        });
        await request(app)
            .post("/api/reset")
            .send({
                token: user.token,
                new: "Adnaan"
            })
            .expect(200)
            .then((res) => {
            });
        login_res = await Helper.Login(app, {
            email: "adnaan.bheda@gmail.com",
            password: "Adnaan"
        });
        assert(res.body.success === true);
    });

    it("Verify Account ", async () => {
        const register_res = await Helper.Register(app, {
            email: "hello@gmail.com",
            password: "adnaanbheda",
            name: "Adnaan Bheda",
        });
        let url = "/api/verify?token=" + register_res.body.token;
        const verify_res = await request(app)
            .get(url)
            .expect(200);
        assert(verify_res.body.success === true);
    });
});