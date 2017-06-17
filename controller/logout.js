var express = require('express'),
app= express(),
router = express.Router();
var fs = require('fs');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
router.post('/', function(req,res)
{
   var token = localStorage.getItem('myKey');
    console.log(token);
//fs.writeFile('../controller/myKey', '', function(){console.log('done')})
  localStorage.setItem('myKey', "");
res.send({status:false,message:"logout success"});
});
module.exports = router;
