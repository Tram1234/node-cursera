var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes.js');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var verifay = require('./verifay');


router.use(bodyParser.json());

router.route('/')
    .get(verifay.verifyOrdinaryUser, function(req,res){
        Dishes.find({})
            .then(function (dish) {
                res.json(dish)
            })
            .catch(function (err) {
                console.log(err + ' happend')
            });

    })

    .post(verifay.verifyOrdinaryUser,function(req,res) {
        Dishes.create(req.body)
            .then(function (dish) {
                var id = dish._id;
                console.log("Dish Created");
                res.writeHead(200, {'Content-Type': 'plain/text'});
                res.end('Added the dish with id: ' + id);
            })
            .catch(function (err) {
                console.log(err + ' happened')
            })
    })
.delete(verifay.verifyAdmin, function(req,res){
    Dishes.remove({})
        .then(function (response) {
            res.json(response)
        })
        .catch(function (err) {
            console.log(err + ' happened')
        })
});
router.route('/:dishId')
.get(verifay.verifyOrdinaryUser, function(req,res){
   Dishes.findById(req.params.dishId)
       .then(function (dish) {
           res.json(dish)
       })
       .catch(function (err) {
           console.log(err + ' happened')
       })
})
.put(verifay.verifyAdmin ,function(req,res){
    Dishes.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true})
        .then(function (dish) {
            res.json(dish)
        })
        .catch(function (err) {
            console.log(err + ' happened')
        });

})


    .delete(verifay.verifyAdmin ,function(req, res){
        Dishes.findByIdAndRemove(req.params.dishId)
            .then(function (response) {
                res.json(response);
            })
            .catch(function (err) {
                console.log(err + ' happened')
            });
    });
router.route('/:dishId/comments')
    .get(verifay.verifyOrdinaryUser, function(req,res){
        Dishes.findById(req.params.dishId)
            .then(function (dish) {
                res.json(dsih.comments)
            })
            .catch(function (err) {
                console.log(err + ' happened')
            });
    })
    .post(verifay.verifyOrdinaryUser, function(req,res){
       Dishes.findById(req.params.dishId)
           .then(function (dish) {
               dish.comments.push(req.body);
               return dish.save();
           })
           .then(function (dish) {
               console.log('Comment has been added');
               res.json(dish);
           })
           .catch(function (err) {
               console.log(err + ' happened')
           });

    })
    .delete(verifay.verifyOrdinaryUser, function(req,res){
        Dishes.findById(req.params.dishId)
            .then(function (dish) {
                for (var i = (dish.comments.length - 1); i >= 0; i--) {
                    dish.comments.id(dish.comments[i]._id).remove();
                }
                return dish.save();
            })
            .then(function () {
                res.writeHead(200,{'Content-Type':'plain/text'});
                res.end('deleted all comments');
            })
            .catch(function (err) {
                console.log(err + ' happened')
            });
    });

router.route('/:dishId/comments/:commentId')
    .get(verifay.verifyOrdinaryUser, function (req,res) {
        Dishes.findById(req.params.dishId)
            .then(
                res.json(dish.comments.id(req.params.commentId))
            )
            .catch(function (err) {
                console.log(err + ' happened')
            });
    })
    .put(verifay.verifyOrdinaryUser, function (req,res) {
        Dishes.findById(req.params.dishId)
            .then(function (dish) {
                dish.comments.id(req.params.commentId).remove();
                dish.comments.push(req.body);
                return dish.save();
            })
            .then(function (dish) {
                console.log('Updated Comments!');
                res.json(dish);
            })
            .catch(function (err) {
                console.log(err + 'happend');
            })
    })
    .delete(verifay.verifyOrdinaryUser, function (req,res) {
       Dishes.findById(req.params.dishId)
           .then(function(dish){
               dish.comments.id(req.params.commentId).remove();
               return dish.save()
           })
           .then(function (response) {
               res.json(response);
           })
           .catch(function (err) {
               console.log(err + 'happend');
           })
    });


module.exports = router;