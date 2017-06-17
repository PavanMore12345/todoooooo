var express = require('express'),
    router = express.Router();
var jwt = require('jsonwebtoken');
//var config = require('../config/index');
var userregister=require('../model/user');

router.post('/', function(req, res) {
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
  module.exports = router;
