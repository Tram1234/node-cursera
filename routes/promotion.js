var express = require('express');
var router = express.Router();
var Promotion = require('../models/promo');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
router.use(bodyParser.json());


router.route('/')
.get(function(req,res){
    Promotion.find({})
        .then(function (promo) {
            res.json(promo);
        })
        .catch(function (err) {
            console.log(err + ' <- this error happend')
        });
})
.post(function(req,res){
    Promotion.create(req.body)
        .then(function (promo) {
            var id = promo._id;
            console.log("Dish Created");
            res.writeHead(200, {'Content-Type': 'plain/text'});
            res.end('Added the dish with id: ' + id);
        })
        .catch(function (err) {
            console.log(err + ' <- this error happend')
        });
})
.delete(function(req,res){
    Promotion.remove({})
        .then(function (respons) {
            res.json(respons)
        })
        .catch(function (err) {
            console.log(err + ' <- this error happend')
        })
});

router.route(':/promoId')
    .get(function(req,res){
    Promotion.findById(req.params.promoId)
        .then(function (respons) {
            res.json(respons)
        })
})
    .put(function(req,res){
        Promotion.findByIdAnUpdate(req.params.promoId,{$set:req.body},{new:true})
            .then(function (promo) {
                res.json(promo);
            })
    })
.delete(function(req,res){
    Promotion.findByIdAndRemove(req.params.promoId)
        .then(function (resp) {
            res.json(resp)
        })
});

module.exports = router;
