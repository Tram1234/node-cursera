/**
 * Created by root on 7/24/16.
 */
var express = require('express');
var router = express.Router();
var verifay = require('./verifay');
var User = require('../models/users');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;



router.route('/')
.get(verifay.verifyAdmin, function (req,res) {
    User.find({})
        .then(function (users) {
            res.json(users);
        })
        .catch(function (err) {
            console.log(err + ' happend')
        });

});
 module.exports = router;