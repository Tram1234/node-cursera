/**
 * Created by root on 8/8/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./users');
var Dish = require('./dishes');


var FavoritesSchema = new Schema({

    addedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    favoriteDish:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Dish'
    }

});

var favorites = mongoose.model('Favorite',FavoritesSchema);

module.exports = favorites;