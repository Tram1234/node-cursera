/**
 * Created by root on 7/24/16.
 */
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var confing = require('../conf');

exports.getToken = function(user){
    return jwt.sign(user,confing.secretKey,{
        expiresIn:3600
    })
};

exports.verifyOrdinaryUser = function (req,res,next) {
    var token = req.body.token || req.query.token ||  req.headers['x-access-token'];

    //decode
    if(token){
        jwt.verify(token,confing.secretKey,function(err,decoded){
            if (err){
                var err = new Error('You are not authenticated');
                err.status = 401;
                return next(err);
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        var err = new  Error('No token supplied');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function (req,res,next) {
    var token = req.body.token || req.query.token ||  req.headers['x-access-token'];
    if(token){
        jwt.verify(token,confing.secretKey,function(err,decoded){
            if (err){
                var err = new Error('You are not authenticated');
                err.status = 401;
                return next(err);
            }else{
                req.decoded = decoded;
                if(req.decoded._doc.admin === true) {
                    next();
                }else{
                    var err = new Error('You are not admin');
                    err.status = 403;
                    return next(err);
                }

            }
        });
    }else{
        var err = new  Error('No token supplied');
        err.status = 403;
        return next(err);
    }
};
