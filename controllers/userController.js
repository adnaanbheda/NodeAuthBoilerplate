const Users = require('../models/User')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keys = require('../config/keys');
const nodemailer = require('nodemailer');
const util = require('../utility');
module.exports = {
    async GetOrderList(req, res) {
        const id = req.decoded.id;
        const user = await Users.findById(id).populate("orderlist");
        res.send(util.message(true, user.orderlist));
    },
    async CreateOrder(req, res) {
        const id = req.decoded.id;
        const order = await Orders.create(req.body);
        try {
            const user = await Users.findByIdAndUpdate(id, {
                $push: {
                    orderlist: order
                }
            });
            res.status(200).send(util.message(true, {
                message: "Order created",
                data: order
            }));
        } catch (error) {
            res.sendStatus(500);
        }
    },
    async DeleteOrder(req, res) {
        const id = req.decoded.id;
        const user = await Users.findById(id);
        const
    },
    async ForgotPassword(req, res) {
        try {
            // key = keys.resetSecret;
            let id = req.decoded.id;
            let key = keys.resetSecret;
            let encrypted = await util.encrypt();
            const user = await Users.findByIdAndUpdate(id, {
                $set: {
                    token: encrypted
                }
            });

            if (process.env.NODE_ENV === 'production') {
                const transporter = nodemailer.createTransport(keys.transporter);
                const mailOptions = {
                    to: user.email,
                    subject: "Rest Password Instructions",
                    html: `Hello, We have received a request for changing your password. Please click this link to continue\n\n
                    <a href="http://localhost:3000/api/reset?token=${encrypted}">Click here</a>`,
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.send(util.message(true, "Check your email for further instructions."));
                    }
                });
            } else {
                res.send(util.message(true, {
                    message: "Token provided.",
                    token: encrypted
                }));
            }
        }
        catch (error) {
            console.log(error);
            res.send(util.message(false, "Failure."));
        }
    }
}