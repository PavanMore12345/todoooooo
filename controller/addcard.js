/*
 * Add New Data
 * @path controller/addcard.js
 * @file addData.js
 * @Scripted by Pavan
 */

/*ModuleModule
 * Module dependencies
 */
var express = require('express'),
    app = express(),
    router = express.Router(),
    addcard = require('../model/cardSchema');
    var logger = require('winston');
    //addcard api is called
router.post('/', function(req, res) {
    console.log(req.decoded);
    try {
      //read data from frontend
        var data = {
            id: req.decoded.id,
            title: req.body.title,
            bodyContent: req.body.bodyContent,
            color:req.body.color
        }
        //console.log(data);
        addcard.addCardData(data, function(err, data) {

            try {
                if (err) {
                  //send err response
                    res.send({
                        "status": false,
                        "message": err
                    });
                    logger.error(err)
                } else {
                  //send response addcard success
                    res.send({
                        "status": true,
                        "message": " addcard successfully"
                    });
               logger.info("Data Successfully added")
                }
            } catch (e) {
                res.send({
                    "status": false,
                    "message": "fail"
                });
            }
        });
    } catch (e) {
        res.send({
            "status": false,
            "message": "server error"
        });
    }
});
module.exports = router;
