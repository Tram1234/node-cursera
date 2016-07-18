var mongoose = require('mongoose');
Schema = mongoose.Schema;

var leadersSchema = new Schema({
   name:{
       type:'String',
       required:true
   },
   image:'String',
   designation:{
       type:'String',
       required:true
   },
   abbr:'String',
   descritption:{
       type:'String',
       required:true
   }


});

var Leaderships = mongoose.model('leadership',leadersSchema);

module.exports = Leaderships;