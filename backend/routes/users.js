const router = require('express').Router();
const User = require('../models/user_model');
require('../server.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var express = require('express');



router.route('/').get((req, res) => {
    User.find()
        .then(users = res.json(users))
        .catch(err => res.sendStatus(400).json('Error : ' + err));
})

router.route('/add').post((req, res) => {
    User.findOne({ email: req.body.email })
        .then(docs => {
            if (docs) {
                res.send('User Already Exists With This E-Mail .....!!')
            }
            else {
                let user = new User;
                user.email = req.body.email;
                user.fullname = req.body.fullname;
                user.phone = req.body.phone;
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        user.password = hash;
                        user.save()
                            .then(() => {
                                res.send('submitted')
                            })
                            .catch((err) => {
                                res.send(err)
                            })
                    }
                })
            }
        })
})

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(docs => {
            if (docs) {
                console.log("Encrypt");
                bcrypt.compare(req.body.password, docs.password, (err, isMatched) => {
                    console.log(isMatched)
                    if (err) {
                        res.send(err)
                    }
                    else if (isMatched) {
                        jwt.sign({ id: docs._id }, 'LAKSHAY', (err, token) => {
                            if (err) {
                                res.send(err)
                            }
                            res.send({ token })
                        })
                    }
                    else {
                        res.send('Password Incorrect !!');
                    }
                })
            }
            else {
                res.send("User do not Exist !!");
            }
        })
})

router.route('/logout').get((req, res) => {
    req.logOut();
    res.redirect("/user/ogin");
})

module.exports = router;
