var express      =  require("express");
  var   app          =  express();
  var validator = require('express-validator');
    var bodyParser   =  require("body-parser");
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(validator());


var cors = require("cors");
//var cookieSession = require('cookie-session');
app.use(require('./controller/index.js'));
app.use(express.static("./public"));
//app.use(express.static("./public"));


var port = 8040;
app.listen(port,function () {
  // connect();
  console.log("listning from the port" +port);
});
