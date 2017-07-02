/*
 * delete the card
 * @path controller/deletecard.js
 * @file deletecard.js
 * @Scripted by Pavan
 */

/*ModuleModule
 * Module dependencies
 */
var express = require('express'),
    app = express(),
    router = express.Router(),
    deletecard = require('../model/cardSchema');
var logger = require('winston');
//deletecard api is called
router.delete('/:id', function(req, res) {
    //console.log(req.decoded);
    //console.log("nvlvldsnlvdsnlv");
    try {
        // var data = {
        //     id1: req.decoded.id,
        //     title: req.body.title,
        //     bodyContent: req.body.bodyContent
        // }
        //console.log("HI HOW R U",req.params.id);
        var id=req.params.id;
        //var userid=req.decoded;
      //  console.log("id",data);
        deletecard.deleteCardData(id,function(err, data) {
          console.log(err);
          console.log("id",id);
            // console.log(data.id1);
            try {
              console.log("data........",data);
                if (err) {
                    res.send({
                        "status": false,
                        "message": err
                    });
                    logger.error(err)
                } else {
                  logger.info("card deleted sucess");
                    res.send({
                        "status": true,
                        "message": " deletecard successfully"
                    });
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
