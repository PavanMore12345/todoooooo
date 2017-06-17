var express = require('express'),
    app = express(),
    router = express.Router(),
    updatecard = require('../model/cardSchema');

router.post('/', function(req, res) {
    //console.log(req.decoded);
    //console.log("nvlvldsnlvdsnlv");
    try {
        var data = {
           id:req.body.id,
            title: req.body.title,
            bodyContent: req.body.bodyContent
        }
        console.log("data abc 22",data);
        //console.log("HI HOW R U",req.params.id);
        updatecard.updateCardData(data, function(err, data) {
          console.log(err);
            // console.log(data.id1);
            try {
              console.log(data);
                if (err) {
                    res.send({
                        "status": false,
                        "message": err
                    });
                    // console.log(err.errors);
                } else {
                    res.send({
                        "status": true,
                        "message": " updatecard successfully"
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
