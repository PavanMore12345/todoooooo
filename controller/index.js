var express = require('express'),
router = express.Router();
// router.get('/',function(req,res){
//    res.send('main controller');
// });
var jwt    = require('jsonwebtoken');
var config = require('../config/index');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var facebook = require('./facebook')(passport); //configure facebook
var google = require('./google')(passport); //configure facebook
var User = require("../model/user");
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));
    router.get('/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['email','public_profile','user_photos','publish_actions','user_status']
        }));
router.use('/signup',require('./signup'));
router.use('/login',require('./login'));
router.use('/checklogin',require('./checklogin'));
router.use('/logout',require('./logout'));
router.use('/deletecard',require('./authenticate'),require('./deletecard'));
router.use('/imageload',require('./imageload'));
router.use('/activity',require('./authenticate'),require('./activity'));
//router.use('/getDataById',require('./getDataById'));
router.use('/updatecard',require('./updatecard'));
router.use('/setcolor',require('./setcolor'));
// router.use('/updatecard',require('./updatecard'));
//router.use('/',require('./auth'));
router.use('/addcard',require('./authenticate'),require('./addcard'));
//router.use('/imageload',require('./userdata'));
//router.use('/',require('./logout'));
router.use('/getData',require('./authenticate'),require('./getData'));
router.use('/getuserdata',require('./authenticate'),require('./getuserdata'));
router.use('/userprofile',require('./authenticate'),require('./userprofile'));
//router.use('/deletecard',require('./notecard'));
router.use('/reminders',require('./reminders'));
router.use('/removeReminder',require('./removeReminder'));
router.use('/pinnote',require('./authenticate'),require('./pinnote'));
//router.use('/',require('./addcard'))
// router.get('/auth/facebook',
//     passport.authenticate('facebook', {
//         scope: ['email','public_profile','user_photos','publish_actions','user_status']
//     }));
    router.use('/archieve',require('./authenticate'),require('./archieve'));
    router.use('/deletedata',require('./authenticate'),require('./deletedata'));
router.get('/facebook/callback',facebookSignInCallback);
function facebookSignInCallback(req, res, next) {
  //  passport = req.passport.instance;
    passport.authenticate('facebook',function(err, user, info) {
			console.log("user",user);
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.redirect('/#!/login');
        }else {
          return res.redirect('/#!/todo');
        }

            //  res.writeHead(302, {
            //      'Location': '/#!/authProvider?token=' + user.fb.access_token + '&id='+user._id+ '&fb_id='+user.fb.id+ '&email='+user.fb.email+ '&photo='+user.fb.profile+ '&provider='+'fb'
            //  });
            res.end();
        // });
    })(req,res,next);
}

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
// router.get('/auth/google',
//     passport.authenticate('google', {
//         scope: ['email', 'profile']
//     }));
router.get('/google/callback',googleSignInCallback);
    function googleSignInCallback(req, res, next) {
        //passport = req._passport.instance;
        passport.authenticate('google',function(err, user, info) {
    		//	console.log("users::1111",user);
            if(err) {
                return next(err);
                console.log(err);
            }
          //  console.log(user);

            if(!user) {
                return res.redirect('/#!/login');
            }
            else {
              return res.redirect('/#!/todo');
            }
            // console.log(user);
            //     res.writeHead(302, {
            //         'Location': '/#!/authProvider?token=' + user.google.access_token + '&id='+user._id+ '&google_id='+user.google.id+ '&email='+user.google.email+ '&profile='+user.google.profile +'&provider='+'google'
            //     });
            //     res.end();
            // });
        })(req,res,next);
    }
module.exports = router;
