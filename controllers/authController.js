const express = require('express');
const mongoose = require('mongoose');
const Orders = require('../models/Order');
const Users = mongoose.model("users");
const path = require('path');
const jwt = require('jsonwebtoken');
const jsonify = require('../utility/jsonify');
const util = require('../utility');
const keys = require('../config/keys');
const nodemailer = require('nodemailer');
module.exports = {
    async Setup(req, res) {
        try {
            // await User.create({});
            await Orders.create({});
            await Users.create({
                email: "hello@gmail.com"
            });
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(501);
        }
    },
    async Wipe(req, res) {
        try {
            await Users.db.dropDatabase();
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
        res.sendStatus(200);
    },
    LoginUser(req, res) {
        const app = require('../server');
        if (req.body.email === null) {
            res.status(401).json({
                error: "Invalid Details"
            });
            return;
        }
        Users.findOne({
            email: req.body.email
        }, async function (err, user) {
            if (err) throw err;
            if (!user) {
                res.status(401).json(util.message(false, 'Authentication failed. User not found.'));
            } else if (user) {
                // check if password matches
                let success = false;
                // check if password matches
                if (req.body.password) {
                    success = await user.isValidPassword(req.body.password);
                }
                if (!success) {
                    res.status(401).json(util.message(false, "Password Invalid."));
                } else {
                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password
                    var token = jwt.sign({ id: user._id }, app.get('superSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });
                    if (user.verified == false) {
                        res.json(util.message(false, {
                            message: "Please verify your account.",
                            token: token
                        }));
                        return;
                    }
                    // return the information including token as JSON
                    res.json(util.message(true, {
                        message: 'Enjoy your token!',
                        token: token,
                        //Edit required
                        user: user
                    }));
                }
            }
        });
    },
    async RegisterUser(req, res) {
        const data = req.body;
        let user;
        try {
            const temp = await Users.findOne({
                email: data.email
            })
            if (temp)
                throw "Already Exists";
            user = await Users.create({
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone
            });
        } catch (error) {
            res.status(500).send(util.message(true, "Account with that email already exists."));
        }
        if (user) {
            const token = await util.encrypt();
            try {
                //Important 
                await Users.findByIdAndUpdate(user._id, {
                    $set: {
                        token: token
                    }
                });
                if (process.env.NODE_ENV === 'production') {
                    const transporter = nodemailer.createTransport(keys.transporter);
                    const mailOptions = {
                        to: user.email,
                        subject: "Verify Account",
                        html: `Please click below to verify your account\n\n
                    <a href="http://localhost:3000/api/verify?token=${token}">Click here</a>`,
                    }
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.send(true, "Check your email to verify your account.");
                        }
                    });
                } else {
                    res.json(util.message(true, {
                        message: "Token provided.",
                        token: token
                    }));
                }
            }
            catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        }
    },
    async ResetPasswordPage(req, res) {
        let token = req.query.token;
        const user = await Users.findOne({
            token: token
        });
        console.log(user);
        if (user) {
            res.sendFile(path.join(require("process").cwd(), "public", "reset.html"));
        }
        else {
            res.sendStatus(404);
        }
    },
    async ResetPassword(req, res) {
        const token = req.body.token;
        const decrypted = await util.decipher(token);
        if (Date.now() - decrypted > (1000 * 60 * 60 * 24)) {
            res.json(util.message(false, "Token expired."));
            return;
        }
        const newp = req.body.new;
        const user = await Users.findOne({
            token: token
        });
        Users.deleteOne({
            token: token
        });
        if (user) {
            user.password = newp;
            user.token = null;
            user.verified = true;
            try {
                await user.save();
                res.sendStatus(200);
            } catch (error) {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(500);
        }
    },
    async Verify(req, res) {
        const { token } = req.query;
        try {
            const user = await Users.findOne({
                token: token
            });
            if (user) {
                await Users.findByIdAndUpdate(user._id, {
                    $set: {
                        verified: true,
                        token: null
                    }
                });
                res.json(util.message(true, "Your Account is verified."));
            }
            else {
                res.json(util.message(false, "User not found."));
            }
        }
        catch (error) {
            res.json(util.message(false, error.toString()));
        }
    }
}