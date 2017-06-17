var express = require('express'),
    app = express(),
    router = express.Router(),
    getCardDataById = require('../model/cardSchema');

      //  var data1=req.params.id;
      //  console.log("id",data1);
        router.post("/:id",function(request,response)
        {
          var data1=request.params.id;
          console.log("id",data1);
          console.log("SFdfsddddf");
          getCardDataById.getCardData(data1,function(err,msg)
           {
             if(err)
               response.send({status:false,msg:err});
              else
              console.log("asdasdsa",msg);
                 response.send({status:true,msg:msg});
           });
        })

module.exports = router;
