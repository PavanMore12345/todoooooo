var express = require('express');
var router = express.Router();
var UserData = require('../model/cardSchema');

router.post('/:id', function(request, response) {
  console.log(request.params.id);
  var id = request.params.id;
  var data=request.body;
  var userid = request.decoded;
  console.log("pinned",data);
  console.log("userid",userid);
  UserData.pinnedData(id,data,userid.id,function(err, result) {
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

})

module.exports = router;
