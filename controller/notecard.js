var express = require('express'),
    app = express(),
    router = express.Router(),
    addcard = require('../model/cardSchema');

router.post('/addcard', function(req, res) {
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
router.delete('/deletecard:id', function(req, res) {
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
router.post('/pinnote:id', function(request, response) {
  console.log(request.params.id);
  var id = request.params.id;
  var data=request.body;
  console.log("pinned",data);
  UserData.pinnedData(id,data,function(err, result) {
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
    } else {
      response.send({
        "status": true,
        "message": "Note Successfully pinned",
        "updateresult": result

      });
    }

  })

});
router.post('/reminders:id', function(request, response) {

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
            } else {
                console.log("check");
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
router.post('/setcolor:id', function(request, response) {

    var color = request.body;
    // console.log("body hello",color);
    var id = request.params.id;
    // console.log(id);
    try {
        userData.setColors(id,color, function(err, result) {
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
router.post('/updatecard', function(req, res) {
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
module.exports=router;
