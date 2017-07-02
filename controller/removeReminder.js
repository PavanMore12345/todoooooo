/*
 * remove  the reminder to the card
 * @path controller/remove the reminder.js
 * @file removereminder.js
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
var logger = require("winston");
//removeReminder api is called
router.post('/:id', function(request, response) {

    var id = request.params.id;
    try {
        userData.removeReminder(id, function(err, result) {
            if (err) {
                response.json({
                    "status": false,
                    "message": err
                });
                logger.error(err)
            } else {
                response.json({
                    status: true,
                    message: result,
                });
                logger.info("remove the reminder successfully")
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
