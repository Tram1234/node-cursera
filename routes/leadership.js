var express = require('express');
var route = express.Router();

route.all('/',function(req,res,next){
    res.writeHead(200,{'Content-Type':'Plain/text'});

    next();
})
    .get('/',function(req,res){
        res.end('Providing you with all leaders');
    })
    .post('/',function(req,res){
        res.end('Adding leader ' + req.body.leader);
    })
    .delete('/',function(req,res){
        res.end('deleting all leaders')
    });

route.get('/:leaderId',function(req,res){
        res.end('Getting  this ' + req.params.leaderId + ' to you')
    })
    .put('/:leaderId',function(req,res,next){
        res.write('Updating the Leader ' + req.params.leaderId + '/n' );
        res.end('Will update the promotion: ' + req.body.name + ' with details:' + req.body.description);
    })
    .delete('/:leaderId',function(req,res){
        res.end('Deleting leader number ' + req.params.leaderId);
    });

module.exports = route;
