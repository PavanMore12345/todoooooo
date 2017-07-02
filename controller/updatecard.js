/*
 * update  the card
 * @path controller/updatecard
 * @file updatecard.js
 * @Scripted by Pavan
 */
/*ModuleModule
 * Module dependencies
 */
var express = require("express");
var app = express();
var router = express.Router();
var userData = require("../model/cardSchema");
var conn = require("../config");
var logger=require("winston");
var config = require("../config/config");
//var db=config.nedb;
// updatecard api is called
router.post('/:id', function(request, response) {
  logger.info("updateData API was called");
//read data from user
    var bodyData = request.body;
    // console.log("body",bodyData);
    var info = request.params.id;
    try {
        userData.updateCard(bodyData,info, function(err, result) {
            if (err) {
                //winston.error(err);
                response.json({
                    "status": false,
                    "message": err
                });
                logger.error(err)
            } else {
              // winston.info("update successfully",{id: info});
              var currentTime=new Date();
              // var get=currentTime.getDate();

              //doc={message:"update successfully",user_id:result.user_id,time:currentTime};
              // db.insert(doc, function(err, newDoc) {});

                response.json({
                    status: true,
                    message: result,
                });
                logger.info("update card api is called");
            }

        });
        // Put Controler code here
    } catch (error) {
      //winston.error(error);
        response.send({
            "status": false,
            "error": error
        });
        return;
    }
});
module.exports = router;
