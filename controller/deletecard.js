var express = require('express'),
    app = express(),
    router = express.Router(),
    deletecard = require('../model/cardSchema');

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
        var data=req.params.id;
        console.log("id",data);
        deletecard.deleteCardData(data, function(err, data) {
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
