/*
 * get data of particular user
 * @path controller/getData.js
 * @file getData.js
 * @Scripted by Pavan
 */

/*ModuleModule
 * Module dependencies
 */
var logger = require('winston');
var express= require("express");
var getInfo= require("../model/cardSchema");
// var cookieParser = require('cookie-parser');
var app=express();
// app.use(cookieParser());
var router=express.Router();
//getData api is called
router.post("/",function(request,response)
{
  getInfo.getCard(request.decoded.id,function(err,msg)
   {
     if(err)
     {
        response.send({status:false,msg:err});
        logger.error(err)
     }else
     {
         
         response.send({status:true,msg:msg});
         logger.info("get data successfully");
     }
   });
})
module.exports = router;
