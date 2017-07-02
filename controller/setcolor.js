/*
 * set the color to the card
 * @path controller/setcolor
 * @file setcolor.js
 * @Scripted by Pavan
 */
/*ModuleModule
 * Module dependencies
 */
var express = require("express");
var app = express();
var router = express.Router();
var userData = require("../model/cardSchema");
var config = require("../config");
var logger = require('winston');
router.post('/:id', function(request, response) {

    var color = request.body;
    var id = request.params.id;
    // console.log(id);
    try {
      //set color api is called
        userData.setColors(id,color, function(err, result) {
            if (err) {
                response.json({
                    "status": false,
                    "message": err
                });
                logger.error(err)
            } else {
              //message shows the response of set the color.
                response.json({
                    status: true,
                    message: result,
                });
                logger.info("color has been set")
            }
        });
        // Put Controler code here
    } catch (error) {
        response.send({
            "status": false,
            "error": error
        });
        return;
    }
});
module.exports = router;
