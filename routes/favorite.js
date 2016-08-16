/**
 * Created by root on 8/8/16.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport =require('passport');
var Favs = require('../models/favorits');
var Dish = require('../models/dishes');
var verify = require('./verifay');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

router.use(bodyParser.json());

router.route('/')
    .all(verify.verifyOrdinaryUser)
.get( function (req,res) {
    Favs.find({}).populate('user.addedBy').populate('dishes.favoriteDish')
        .then(function (favoriteDish) {
            res.json(favoriteDish)
        })
        .catch(function (err) {
            console.log(err)
        })
})
    .post(function (req,res) {
       Dish.findById(req.body)
           .then(function (dish) {
               return Favs.save(dish)
           })
           .then(function () {
               
           })
           .catch(function (err) {
               console.log(err);
           })
    });

module.exports = router;