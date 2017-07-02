/*
 * pin the card
 * @path controller/pinnote.js
 * @file pinnote.js
 * @Scripted by Pavan
 */
/*ModuleModule
 * Module dependencies
 */
 var logger = require('winston');
var express = require('express');
var router = express.Router();
var UserData = require('../model/cardSchema');
//pinnote api is called
router.post('/:id', function(request, response) {
  console.log(request.params.id);
  var id = request.params.id;
  var data=request.body;
  var userid = request.decoded;
  console.log("pinned",data);
  console.log("userid",userid);
  //search into the database
  UserData.pinnedData(id,data,userid.id,function(err, result) {
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
      logger.error(err)
    } else {
      response.send({
        "status": true,
        "message": "Note Successfully pinned",
        "updateresult": result

      });
      logger.info("note successfully pinned")
    }

  })

})

module.exports = router;
