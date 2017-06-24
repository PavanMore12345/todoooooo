var express = require('express'),
    app = express(),
    router = express.Router();
var mongo = require('mongoose');
var connect1 = mongo.createConnection('mongodb://127.0.0.1/mydb2');
var Schema = mongo.Schema;
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
var activity = connect1.model('activity', logSchema);
module.exports = activity;
