var express = require("express");
var app = express();
var router = express.Router();
var userData = require("../model/cardSchema");
var config = require("../config");

router.post('/:id', function(request, response) {

    var id = request.params.id;
    try {
        userData.removeReminder(id, function(err, result) {
            if (err) {
                response.json({
                    "status": false,
                    "message": err
                });
            } else {
                response.json({
                    status: true,
                    message: result,
                });
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
