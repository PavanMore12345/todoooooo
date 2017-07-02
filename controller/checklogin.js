/*
 * check login
 * @path controller/checklogin.js
 * @file checklogin.js
 * @Scripted by Pavan
 */

/*ModuleModule
 * Module dependencies
 */
var express=require("express");
var router=express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
var logger = require('winston');
router.get("/",function (req, res) {
  var token = localStorage.getItem('myKey');
//  console.log(req.decoded);
//console.log(token);
  //console.log(req.session);
   if(token === ""){
     res.send({"status":false,"message":"no user","session":false});
     logger.error("login error")
   }else{
     logger.info("user exist")
     res.send({"status":true,"message":"user exist","session":true});
   }

  // console.log(request.session);

})
module.exports=router;
