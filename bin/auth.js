/**
 * Created by root on 7/20/16.
 */
var express = require('express');


 var auth = {

     autho:function(req,res,next){
     console.log(req.headers);
     var authHeader = req.headers.authorization;

     if (!authHeader) {
         var err = new Error('You are not authenticated!');
         err.status = 401;
         next(err);
         return;
     }
     var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
     var user = auth[0];
     var pass = auth[1];
     if (user == 'admin' && pass == 'password') {
         next(); // authorized
     } else {
         var err = new Error('You are not authenticated!');
         err.status = 401;
         next(err);
     }
 }


 };

module.exports = auth;