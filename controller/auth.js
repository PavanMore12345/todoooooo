//var apiRoutes = express.Router();

var express = require('express'),
router = express.Router();
var jwt    = require('jsonwebtoken');
var config = require('../config/index');
//router.get('/auth', function(req, res) {
var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
//var LocalStorage = require('node-localstorage').LocalStorage;

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = localStorage.getItem('myKey');
console.log(token);
  // decode token
  if (token) {
//console.log(token);
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
        //res.json({success:true,message:req.decoded});
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
//// route to show a random message (GET http://localhost:8080/api/)

// route to return all users (GET http://localhost:8080/api/users)

// apply the routes to our application with the prefix /api
//app.use('/api', apiRoutes);
module.exports=router;
