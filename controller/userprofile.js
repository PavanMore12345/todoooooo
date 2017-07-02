/*
 * set the user profile
 * @path controller/userprofile
 * @file userprofile.js
 * @Scripted by Pavan
 */
/*ModuleModule
 * Module dependencies
 */
var express = require('express'),
    router = express.Router();
var jwt = require('jsonwebtoken');
var logger = require('winston');
var userregister=require('../model/user');
router.post('/', function(req, res) {
  //console.log("abc");
  try
  {
    //userProfile api is called
     userregister.userProfile(req.decoded, function(err,data)
     {
     if(err)
     {
     res.send({status:false,message:"user not available"});
     logger.error(err)
     }
     else
     {
     if (data)
     {
    res.send({
    id:data.id,
    email:data.email,
    username:data.username,
    status:true,
    croped:data.cropedImage,
    original:data.originalImage
        });
        logger.info("use profile has been set")
      }
      else
      {
        res.send({status:false,message:"user not available..."});
      }
    }
  });
  } catch (e)
  {
    res.send({status:false,message:"exception error"});
  }
    });
  module.exports = router;
