var express=require("express");
var router=express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
router.get("/",function (req, res) {
  var token = localStorage.getItem('myKey');
  console.log(req.decoded);
console.log(token);
  //console.log(req.session);
   if(token === ""){
     res.send({"status":false,"message":"no user","session":false});
   }else{
     res.send({"status":true,"message":"user exist","session":true});
   }

  // console.log(request.session);

})
module.exports=router;
