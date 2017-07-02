/*
 * check username and password
 * @path controller/logout.js
 * @file logout.js
 * @Scripted by Pavan
 */
/*ModuleModule
 * Module dependencies
 */
var express = require('express'),
app= express(),
router = express.Router();
var fs = require('fs');
var logger = require('winston');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
//logout api is called
router.post('/', function(req,res)
{
   var token = localStorage.getItem('myKey');
    console.log(token);
//fs.writeFile('../controller/myKey', '', function(){console.log('done')})
//set the localStorage empty and remove the token
  localStorage.setItem('myKey', "");
res.send({status:false,message:"logout success"});
logger.info("logout success")
});
module.exports = router;
