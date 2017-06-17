var express=require("express");

// var cookieParser = require('cookie-parser');
//var app=express();
var info=require("../model/user");
// app.use(cookieParser());
var router=express.Router();
router.post("/",function(request,response)
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
module.exports = router;
