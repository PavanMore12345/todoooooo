var express = require('express'),
     app = express(),
    router = express.Router();
var jwt = require('jsonwebtoken');
//var config = require('../config/index');
var userregister=require('../model/user');
var config = require('../config/index');
var config1 = require('../config/config');
//var jwt = require('jsonwebtoken');
app.set('superSecret', config.secret);

var fs = require("fs");

var change = function(image, type, folderLoc, ext) {
    var url = folderLoc + "/" + type + "_." + ext;
    fs.writeFile("public/"+url, image, {
        encoding: 'base64'
    }, function(err) {
        if (err) {
            console.log('error');
        } else {
            console.log('File created');
            return url;
        }
    });
    return url
}

router.post('/imageload:id', function(request, response) {

    var image = request.body;
    var id = request.params.id;
    console.log("id",id);
    // console.log("body", image.originalImage);
    var orignal = image.originalImage.replace(/^data:image\/(jpg|png|jpeg);base64,/g, "");
    var croped = image.cropedImage.replace(/^data:image\/(png|jpeg);base64,/g, "");
    var name = image.name;
    if (!fs.existsSync("public/profile/" + name)) {
        fs.mkdirSync("public/profile/" + name);
    }
    // fs.mkdirSync("profile/" + name);
    var folderLoc = "profile/" + name;
    var orignalUrl = change(orignal, "orignal", folderLoc,"jpg");
    // console.log(orignalUrl);
    var cropedUrl = change(croped, "croped", folderLoc, "png");
    var url = {
        original: orignalUrl,
        croped: cropedUrl
    }
    console.log('url',url);
    try {
        user.uploadProfilePic(id, url, function(err, result) {
            if (err) {
                response.json({
                    "status": false,
                    "message": err
                });
            } else {
                // console.log("check");
                response.send({"status": true,
                        "id": result.id,
                        "name":result.user_name,
                        "email":result.email,
                        "croped":result.cropedImage,
                        "original":result.originalImage
                    });
            }
        });
        // Put Controler code here
    } catch (error) {
        response.send({
            "status": false,
            "error": error
        });
        return;
    }
});
  router.post("/getuserdata",function(request,response)
  {
    console.log("idd",request.decoded.id);
    info.getUserData(request.decoded.id,function(err,msg)
     {
       if(err)
         response.send({status:false,msg:err});
        else
        //console.log(msg);
           response.send({status:true,msg:msg});
     });
  })
  router.post('/userprofile', function(req, res) {
    console.log("abc");
    try {
       userregister.userProfile(req.decoded, function(err,data)
    {
      console.log(req.decoded);
      if(err)
      {
        res.send({status:false,message:"user not available"});
      }
      else {
        console.log(data);
        if (data) {
          res.send({

            id:data.id,
            email:data.email,
            username:data.username,
            status:true,
            croped:data.cropedImage,
          original:data.originalImage
          });
        }else {
          res.send({status:false,message:"user not available"});
        }
      }
    });
    } catch (e) {
      console.log(e);
  res.send({status:false,message:"exception error"});
    }
});
router.post('/login', function(req, res) {
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

                login.checklogin(loginData, function(err, data) {
                    try {
                        if (err || !data) {
                            throw err
                        }
                        var Userobj = data.toJSON();
                        var token = jwt.sign({
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
                    } catch (e) {
                      //  console.log(e);
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
router.post('/signup', function(req, res) {
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
  module.exports=router;
