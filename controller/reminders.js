/*
 * set the reminder to the card
 * @path controller/reminder.js
 * @file reminder.js
 * @Scripted by Pavan
 */
/*ModuleModule
 * Module dependencies
 */
var express = require("express");
var app = express();
var router = express.Router();
var userData = require("../model/cardSchema.js");
var config = require("../config");
var logger = require("winston");
// reminder api is called
router.post('/:id', function(request, response) {

    var reminder = request.body;
    console.log("body",reminder);
    var id = request.params.id;
    try {
        userData.reminders(reminder,id, function(err, result) {
            if (err) {
                response.json({
                    "status": false,
                    "message": err
                });
                logger.error(err)
            } else {
                console.log("check");
                response.json({
                    status: true,
                    message: result,
                });
            logger.info("successfully set the reminder")
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
