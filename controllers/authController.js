const express = require('express');
const mongoose = require('mongoose');
const Users = mongoose.model("users");
const jsonify = require('../utility/jsonify');
module.exports = {
    Setup(req, res) {
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
            console.log(user);
            if (err) throw err;
            if (!user) {
                res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                // check if password matches
                let success = false;
                // check if password matches
                if (req.body.password) {
                    success = await user.isValidPassword(req.body.password);
                }
                if (!success) {
                    res.status(401).json({ success: false, message: 'Password Invalid.' })
                } else {
                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password
                    var token = jwt.sign({ id: user._id }, app.get('superSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        //Edit required
                        user: jsonify(user)
                    });
                }
            }
        });

    },
    RegisterUser(req, res) {
        const data = req.body;
        User.create(data)
            .then(() => {
                console.log("User Created Successfully");
                res.sendStatus(200);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    },
    async LogoutUser(req, res) {
        if (req.body.email === null) {
            res.status(401).json({
                error: "Invalid Details"
            });
        }
        User.findOne({
            email: req.body.email
        }, async function (err, user) {
            console.log(user);
            if (err) throw err;
            if (!user) {
                res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                // check if password matches
                let success = false;
                // check if password matches
                if (req.body.password) {
                    success = await user.isValidPassword(req.body.password);
                }
                if (!success) {
                    res.status(401).json({ success: false, message: 'Password Invalid.' })
                } else {
                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password
                    var token = jwt.sign({ id: user._id }, app.get('superSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        user: {
                            active: user.active,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            }

        });
    }
}