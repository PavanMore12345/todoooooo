/*
 * check username and password
 * @path controller/login.js
 * @file login.js
 * @Scripted by Pavan
 */
/*ModuleModule
 * Module dependencies
 */
var express = require('express'),
    app = express(),
    router = express.Router(),
    login = require('../model/user');
var config = require('../config/index');
var config1 = require('../config/config');
var logger = require('winston');
var jwt = require('jsonwebtoken');
//var validator = require('express-validator');
//  var localStorage = require('node-localstorage').LocalStorage;
//app.use(validator);
app.set('superSecret', config.secret);
// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
// }
// var defaultResult = {
//     "status": false,
//     "message": "Something Bad Happened. Please contact system administrator."
// };
// console.log("asfdashfhsafhga");
//login api is called.
router.post('/', function(req, res) {
  var result = {};
  result.status = false;
    try {

        var loginData = {
            email: req.body.email,
            password: req.body.password,
            //username:req.body.username
        }
        console.log(loginData);
        //console.log(config1.validationSchema.login);
        req.check(config1.validationSchema.login);
        req.getValidationResult().then(function(isValid) {
            try {
                console.log("errors");
                if (!isValid.isEmpty()) {
                    var errors = req.validationErrors();
                    console.log(errors); // isValid = isValid.useFirstErrorOnly();
                    throw errors[0].msg;
                    // console.log(errors);
                }
                // console.log("asfdashfhsafhga");
                //searching into the database.
                login.checklogin(loginData, function(err, data) {
                    try {
                        if (err || !data) {
                            throw err
                            logger.error(err)
                        }
                        var Userobj = data.toJSON();
                        var token = jwt.sign({ // it create jwt token
                            id: Userobj._id
                        }, app.get('superSecret'), {
                            expiresIn: 1440*60 // expires in 24 hours
                        });
                        localStorage.setItem('myKey', token);
                        res.send({
                            "status": true,
                            "message": "Successfully Login",
                             token: token
                        });
                        logger.info("successfully login")
                    } catch (e)
                    {
                        res.send({
                            "status": false,
                            "message": "Authorization failed"
                        });
                    }
                });
                // Put Controler code here
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
        console.log(e);
        res.send({
            "status": false,
            "message": "server error"
        });
    }

});
module.exports = router;
