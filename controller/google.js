/**
 * google login controller
 */

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../model/user');
var googleConfig = require('../config/auth');
var passport = require('passport');
var jwt    = require('jsonwebtoken');
var config = require('../config/index');
module.exports = function(passport) {
    // used to serialize the user for the session
    // passport.serializeUser(function(user, done) {
    //     console.log("user..", user);
    //     done(null, user.id);
    // });
    //
    // // used to deserialize the user
    // passport.deserializeUser(function(id, done) {
    //     console.log("id..", id);
    //     User.findById(id, function(err, user) {
    //         done(err, user);
    //     });
    // });

    // pull in our app id and secret from our auth.js file
    passport.use(new GoogleStrategy(googleConfig.googleAuth, function(access_token, tokenSecret, profile, done) {
        // asynchronous
        process.nextTick(function() {
            //console.log("profile_id...",profile._id);

            // find the user in the database based on their google id
            User.findOne({
                'google.id': profile.id
            }, function(err, user) {
                console.log("google profile:", profile.photos);

                console.log(typeof profile.photos);
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                // if (err)
                //     return done(err);
                // if the user is found, then log them in
                if (user) {
                  var token = jwt.sign({
                     id:user._id
                 }, config.secret, {
                     expiresIn: 1440*60 // expires in 24 hours
                 });
                 //console.log(token);
                 //console.log("proid..",id);
                 localStorage.setItem('myKey', token);
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that google id, create them
                    var newUser = new User();
                    // set all of the google information in our user model
                    newUser.google.id = profile.id; // set the users google id
                    newUser.google.access_token = access_token; // we will save the token that google provides to the user
                    newUser.google.firstName = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // google can return multiple emails so we'll take the first
                    newUser.google.profile = JSON.stringify(profile.photos);
                    newUser.google.gender = profile.gender;
                    // newUser.google.profile = profile.picture;
                    // save our user to the database
                    console.log("email....",newUser.google.email);
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
