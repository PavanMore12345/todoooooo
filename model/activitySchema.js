/*
 * Activity Schema
 * @path model/activitySchema.js
 * @file activitySchema.js
 */
var express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    connection = require("../config/index");
var Schema = mongoose.Schema;
//schema for Activity
var activitySchema = Schema
({
    id:
    {
        type: Number
    },
    data:
    {
        type: String
    },
    created_at:
    {
        type:Date
    },
    updated_at:
    {
        type: Date
    },
    title:
    {
        type:String
    },
}, {
    collection: "activityData"
});
// hook method to set current time and updated time.
activitySchema.pre('save', function(next)
{
  var currentDate = new Date();

    // change the updated_at field to current date
  this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
  if (!this.created_at)
  this.created_at = currentDate;
  next();
});
// save the activity into database
activitySchema.statics.getCardInfo = function(id, callback)
{
    //console.log("id is", id);
  activity.find(
      {
        id: id
      }, callback);
}
var activity = mongoose.model('activity', activitySchema);
module.exports = activity;
