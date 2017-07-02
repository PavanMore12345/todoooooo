/*
 * load the image
 * @path controller/imageload.js
 * @file imageload.js
 * @Scripted by Pavan
 */

/*ModuleModule
 * Module dependencies
 */
var express = require("express");
var app = express();
var router = express.Router();
var user = require("../model/user");
var config = require("../config");
var fs = require("fs");
var logger= require('winston');
var change = function(image, type, folderLoc, ext) {
    var url = folderLoc + "/" + type + "_." + ext;
    fs.writeFile("public/"+url, image, {
        encoding: 'base64'
    }, function(err) {
        if (err) {
            console.log('error');
        } else {
            console.log('File created');
            return url;
        }
    });
    return url
}
//imageload api is called
router.post('/:id', function(request, response) {

    var image = request.body;
    var id = request.params.id;
    console.log("id",id);
    // console.log("body", image.originalImage);
    //convert the image into base64
    var orignal = image.originalImage.replace(/^data:image\/(jpg|png|jpeg);base64,/g, "");
    var croped = image.cropedImage.replace(/^data:image\/(png|jpeg);base64,/g, "");
    var name = image.name;
    //store image into the profile folder
    if (!fs.existsSync("public/profile/" + name)) {
        fs.mkdirSync("public/profile/" + name);
    }
    // fs.mkdirSync("profile/" + name);
    var folderLoc = "profile/" + name;
    var orignalUrl = change(orignal, "orignal", folderLoc,"jpg");
    // console.log(orignalUrl);
    var cropedUrl = change(croped, "croped", folderLoc, "png");
    var url = {
        original: orignalUrl,
        croped: cropedUrl
    }
    console.log('url',url);
    try {
        user.uploadProfilePic(id, url, function(err, result) {
            if (err) {
                response.json({
                    "status": false,
                    "message": err
                });
                logger.error(err)
            } else {
                // console.log("check");
                response.send({"status": true,
                        "id": result.id,
                        "name":result.user_name,
                        "email":result.email,
                        "croped":result.cropedImage,
                        "original":result.originalImage
                    });
                    logger.info("image loaded successfully");
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
module.exports = router;
