/**
 * facebook login controller
 */var express = require('express'),
      app = express(),
     router = express.Router();
 var jwt    = require('jsonwebtoken');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/user');
var fbConfig = require('../config/auth');
var passport = require('passport');
var config = require('../config/index');

module.exports = function(passport) {
    // used to serialize the user for the session
    // passport.serializeUser(function(user, done) {
    //     console.log(user);
    //     done(null, user.id);
    // });
    //
    // // used to deserialize the user
    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //         done(err, user);
    //     });
    // });

    // pull in our app id and secret from our auth.js file
    passport.use('facebook', new FacebookStrategy(fbConfig.facebookAuth, function(access_token, refresh_token, profile, done) {
        // asynchronous
        process.nextTick(function() {
            console.log("profile in fb", profile);
            //console.log("acess token",access_token);
            //console.log(profile._id);

            // find the user in the database based on their facebook id
            User.findOne({
                'fb.id': profile.id
            }, function(err, user) {
                console.log("user in fb", user);

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                // if (err)
                //     return done(err);
                // if the user is found, then log them in
                if (user) {
                  //  return done(null, user);
                    var token = jwt.sign({
                        id: user._id
                    }, config.secret, {
                        expiresIn: 1440*60 // expires in 24 hours
                    });
                    //console.log(token);
                    localStorage.setItem('myKey', token);
                    return done(null, user); /// user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();
                    //console.log("profilephoto ssssssss",profile.photos);
                    //console.log(typeof profile.photos);

                    // set all of the facebook information in our user model
                    newUser.fb.id = profile.id; // set the users facebook id
                    newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user
                    newUser.fb.firstName = profile.name.givenName;
                    newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
                    //newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.fb.gender = profile.gender;
                    newUser.fb.profile = JSON.stringify(profile.photos);
                    // save our user to the database
                    console.log("new user ....",newUser);
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));

};
