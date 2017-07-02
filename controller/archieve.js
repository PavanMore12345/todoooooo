/*
 * archive the card
 * @path controller/archive.js
 * @file archive.js
 * @Scripted by Pavan
 */

/*ModuleModule
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var userData = require('../model/cardSchema');
var logger = require('winston');
router.post('/:id', function(request, response) {
  console.log(request.params.id);
  var id = request.params.id;
  var data=request.body.value;
  //var userid=request.decoded.id;
  //send id and archive value.
  userData.archiveNote(id,data, function(err, result) {
  //  console.log("result",userid);
    try {
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
  }catch(e)
  {
    console.log(e);
  }

  })

})
module.exports = router;
