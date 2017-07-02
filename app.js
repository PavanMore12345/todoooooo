    var express      =  require("express");
    var   app          =  express();
    var validator = require('express-validator');
    var bodyParser   =  require("body-parser");
    var morgan = require('morgan');
    var logger = require('winston');
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(validator());
logger.configure({
  transports: [
    new(logger.transports.File)({
      name: 'error',
      level: 'error',
      filename: 'error.log'
    }),
    new(logger.transports.File)({
      name: 'info',
      level: 'info',
      filename: 'access.log'
    })
  ]
});
var cors = require("cors");
//var cookieSession = require('cookie-session');
app.use(require('./controller/index.js'));
app.use(express.static("./public"));
//app.use(express.static("./public"));


var port = 8040;
app.listen(port,function () {
  // connect();
  logger.error("unconnected")
  console.log("listning from the port" +port);
  logger.info("Server Started at port no %d",port)
});
