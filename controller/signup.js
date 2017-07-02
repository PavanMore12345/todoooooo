/*
 * user will signup the card
 * @path controller/signup
 * @file signup.js
 * @Scripted by Pavan
 */
/*ModuleModule
 * Module dependencies
 */
var express = require('express'),
    app = express(),
    router = express.Router(),
    signup = require('../model/user');
var config1 = require('../config/config');
var logger = require('winston');
//var morgan  = require('morgan');
//app.use(morgan('dev'));
//   if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// }
//signup api is called
router.post('/', function(req, res) {
    var result = {};
    result.status = false;
    try {
      //read data from user
        var loginData = req.body;
        // check data is validated or not
        req.check(config1.validationSchema.signup);
        req.getValidationResult().then(function(isValid) {
            try {
                if (!isValid.isEmpty()) {
                    var errors = req.validationErrors();
                    console.log(errors); // isValid = isValid.useFirstErrorOnly();
                    throw errors[0].msg;
                    // console.log(errors);
                }
                signup.saveUser(loginData, function(err, data) {
                    try {
                        if (err) {
                            res.send({
                                "status": false,
                                "message": err
                            });
                            // console.log(err.errors);
                            logger.error(err)
                        } else {
                            //console.log(token);
                            //localStorage.setItem('myKey',token);
                            //console.log("localstorage",localStorage.getItem('myKey'));
                            res.send({
                                "status": true,
                                "message": "signup success"
                            });
                            logger.info("signup successfully")
                        }
                    } catch (e) {
                        res.send({
                            "status": false,
                            "message": "signup fail"
                        });
                    }
                });
            } catch (e) {
                if (!config1.checkSystemErrors(e)) {
                    result.status = false;
                    result.message = e;
                }
                res.status(401).send(result);
                return;
            }
        });
    } catch (e) {
        res.send({
            "status": false,
            "message": "server err"
        });
    }
});
module.exports = router;
