var express = require('express'),
    app = express(),
    router = express.Router(),
   mongoose = require('mongoose'),
  connection = require("../config/index");
var Schema = mongoose.Schema;
var logSchema = Schema({
    id1: {
        type: Number
        // unique: true
    },
    data: {
        type: String
    },
    created_at: {
  type:Date
},
},{
    collection: "activityData"
});
logSchema.pre('save', function(next) {
    // get the current date
    // console.log("pre");
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});
logSchema.statics.getCardInfo=function(id,callback)
      {
console.log("id is", id);
                activity.find({id1:id},callback);
        }
var activity = mongoose.model('activity', logSchema);
module.exports = activity;
