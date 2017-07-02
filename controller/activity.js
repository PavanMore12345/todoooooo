/*
 * Add the activity done by user
 * @path controller/activity.js
 * @file activity.js
 * @Scripted by Pavan
 */

/*ModuleModule
 * Module dependencies
 */
var express=require("express");
var getInfo=require("../model/activitySchema");
var app=express();
var router=express.Router();
var logger = require('winston');
//activity api is called
router.post("/",function(request,response)
{
  //search data into the database
  getInfo.getCardInfo(request.decoded.id,function(err,msg)
   {
     //send err response
     if(err)
     {
       response.send({status:false,msg:err});
       logger.error(err)
   } else
   {
         response.send({status:true,msg:msg});
     }
   });
     logger.info("activity Successful")
})
module.exports = router;
