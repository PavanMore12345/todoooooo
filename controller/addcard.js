var express = require('express'),
    app = express(),
    router = express.Router(),
    addcard = require('../model/cardSchema');

router.post('/', function(req, res) {
    console.log(req.decoded);
    try {
        var data = {
            id1: req.decoded.id,
            title: req.body.title,
            bodyContent: req.body.bodyContent,
            color:req.body.color
        }
        console.log(data);
        addcard.addCardData(data, function(err, data) {
          console.log(err);
            // console.log(data.id1);
            try {
                if (err) {
                    res.send({
                        "status": false,
                        "message": err
                    });
                    // console.log(err.errors);
                } else {
                    res.send({
                        "status": true,
                        "message": " addcard successfully"
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
