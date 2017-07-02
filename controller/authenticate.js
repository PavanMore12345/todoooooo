/*
 * it act as middleware api
 * @path controller/authenticate.js
 * @file authenticate.js
 * @Scripted by Pavan
 */
/*ModuleModule
 * Module dependencies
 */
var express = require('express'),
router = express.Router();
var jwt    = require('jsonwebtoken');
var config = require('../config/index');
var logger = require('winston');
 var LocalStorage = require('node-localstorage').LocalStorage;
var  localStorage = new LocalStorage('./scratch');
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = localStorage.getItem('myKey');
//console.log("TTTTTTTTTTTTT",token);
  // decode token
  if (token) {
//console.log(token);
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: 'Failed to authenticate token.' });
        logger.error(err)
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
        //res.json({success:true,message:req.decoded});
        logger.info("toen is provided");
      }
    });

  } else
   {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});
module.exports=router;
