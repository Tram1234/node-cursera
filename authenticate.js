/**
 * Created by root on 8/3/16.
 */
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/users');
var config = require('./conf');






// authorization - local
exports.local = passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

//facbook authorization

exports.facebook  = passport.use(new FacebookStrategy({
    clientID:config.facebook.clientID,
    clientSecret:config.facebook.clientSecret,
    callbackURL:config.facebook.callbackURL
}, function (accessToken,refreshToken,profile,done) {
   User.findOne({OauthId:profile.id}, function (err,user) {
       if(err){
           console.log(err)
       }
       if(!err && user !== null){
           done(null,user);
       }
       user = new User({
           username:profile.displayName
       });
       user.OauthId = profile.id;
       user.OauthToken = accessToken;
       user.save(function (err) {
           err ? console.log(err):console.log('saving ' +  profile.displayName ); done(null,user);
       })
   })
}));