var mongoose = require('mongoose');
Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


var promoSchema =  new Schema({

    name:{
        type:'String',
        required:true
    },
    image:'String',
    label:'String',
    price: {
        type:Currency,
        required:true
    },
    description:'String'
});

var promos = mongoose.model('promotion',promoSchema);

module.exports = promos;