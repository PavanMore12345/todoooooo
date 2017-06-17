
var express=require("express");
var getInfo=require("../model/cardSchema");
// var cookieParser = require('cookie-parser');
var app=express();
// app.use(cookieParser());
var router=express.Router();
router.post("/",function(request,response)
{
  getInfo.getCard(request.decoded.id,function(err,msg)
   {
     if(err)
       response.send({status:false,msg:err});
      else
      //console.log(msg);
         response.send({status:true,msg:msg});
   });
})
module.exports = router;
