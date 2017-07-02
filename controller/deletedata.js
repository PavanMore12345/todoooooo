var express = require('express');
var router = express.Router();
var userData = require('../model/cardSchema');
var logger = require('winston');
router.post('/:id', function(request, response) {
  //console.log(request.params.id);
  var id = request.params.id;
  var data=request.body;
  var userid=request.decoded.id;
//console.log(data);
  userData.deleteNote(id, function(err, result) {
    console.log("deleteddata",data);
    //console.log("result",userid);
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
      logger.error(err)
    } else {
      console.log("result",result);
      response.send({
        "status": true,
        // "message": result
        "message": "Data Successfully deleted",
        "updateresult": result

      });
        logger.info("Data Successfully deleted")
    }
  })
})
module.exports = router;
