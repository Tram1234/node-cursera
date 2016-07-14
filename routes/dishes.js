var express = require('express');
var router = express.Router();

router.all('/',function(req,res,next){
    res.writeHead(200,{'Content-Type':'text/plain' });

    next();
})
.get('/',function(req,res,next){
    res.end('will send all dishes to you!')
})

.post('/',function(req,res,next){
    res.end('Will add the dish ' + req.body.name + ' with details ' + req.body.description);
})

.delete('/',function(req,res,next){
    res.end('del');
});
router.get('/:dishId',function(req,res,next){
   res.end('Will send details of ' + req.params.dishId +' to you');
})
.put('/:dishId',function(req,res,next){
    res.write('Updating the dish ' + req.params.dishId + '/n' );
    res.end('Will update the dish: ' +req.body.name + ' with details:' + req.body.description);
})


    .delete('/:dishId',function(req, res){
        res.end('Deleting dish: ' + req.params.dishId);
    });


module.exports = router;