
const Users = require('../models/User')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keys = require('../config/keys');
const nodemailer = require('nodemailer');
const util = require('../utility');
module.exports = {
    async GetOrderList(req, res) {
        const id = req.decoded.id;
        const user = await Users.findById(id);
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
                    res.send({
                        success: true,
                        message: "Check your email for further instructions."
                    });
                }
            });
        }
        catch (error) {
            console.log(error);
            res.send({
                success: false,
                message: "Failure."
            });
        }
    }
}