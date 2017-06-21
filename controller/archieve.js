var express = require('express');
var router = express.Router();
var userData = require('../model/cardSchema');
var logger = require('winston');



router.post('/:id', function(request, response) {
  console.log(request.params.id);
  var id = request.params.id;
  var data=request.body;
console.log(data);
  userData.archiveNote(id,data, function(err, result) {
    console.log("result",result);
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
        "message": "Data Successfully Archieved",
        "updateresult": result

      });
        logger.info("Data Successfully Archieved")

    }

  })

})

module.exports = router;