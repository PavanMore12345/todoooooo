var express = require('express'),
    app = express(),
    router = express.Router(),
    signup = require('../model/user');
var config1 = require('../config/config');
//var morgan  = require('morgan');
//app.use(morgan('dev'));
//   if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// }
router.post('/', function(req, res) {
    var result = {};
    result.status = false;
    try {
        var loginData = req.body;
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
                        } else {
                            //console.log(token);
                            //localStorage.setItem('myKey',token);
                            //console.log("localstorage",localStorage.getItem('myKey'));
                            res.send({
                                "status": true,
                                "message": "signup success"
                            });
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
