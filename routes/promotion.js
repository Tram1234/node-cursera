var express = require('express');
var route = express.Router();


route.all('/',function(req,res,next){
    res.writeHead(200,{'Content-Type':'text/plain' });

    next();
})
.get('/',function(req,res){
    res.end('Providing you with all promotions');
})
.post('/',function(req,res){
    res.end('Adding promotion ' + req.body.promotion);
})
.delete('/',function(req,res){
    res.end('deleting all promotions')
});

route.get('/:promId',function(req,res){
    res.end('Getting you this ' + req.params.promId + ' to you')
})
    .put('/:promId',function(req,res,next){
        res.write('Updating the promotion ' + req.params.promId + '/n' );
        res.end('Will update the promotion: ' + req.body.name + ' with details:' + req.body.description);
    })
.delete('/:promId',function(req,res){
    res.end('Deleting promotion number ' + req.params.promId);
});

module.exports = route;
