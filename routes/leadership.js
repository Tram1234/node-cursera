var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leaders = require('../models/leaders');
var Promise = require('bluebird');
mongoose.Promise = Promise;

router.use(bodyParser.json());

   router.route('/')
       .get(function(req,res){
        Leaders.find({})
            .then(function (leaders) {
                res.json(leaders)
            })
            .catch(function (err) {
                console.log(err + ' <- this error happend')
            });
    })
    .post(function(req,res){
        Leaders.create(req.body)
            .then(function (leader) {
                var id = leader._id;
                leader.save();
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end('leader with ' + id + ' added');
            })
            .catch(function (err) {
                console.log(err + ' <- this error happend')
            });
    })
    .delete(function(req,res){
       Leaders.remove({})
           .then(
               function (response) {
                   res.json(response);
               }
           )
    });

router.route('/:leaderId')
    .get(function(req,res){
        Leaders.findById(req.params.leaderId)
            .then(function (leader) {
                res.json(leader);
            })
            .catch(function (err) {
                console.log(err + ' <- this error happend')
            });
    })
    .put(function(req,res){
        Leaders.findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new:true})
            .then(function (leader) {
               res.json(leader)
            })
            .catch(function (err) {
                console.log(err + ' <- this error happend')
            });

    })
    .delete(function(req,res){
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then(function (respone) {
                res.json(respone)

            })
            .catch(function (err) {
                console.log(err + ' <- this error happend')
            });

    });

module.exports = router;
