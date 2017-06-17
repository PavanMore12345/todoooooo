var express = require('express'),
    app = express(),
    router = express.Router(),
    addcard = require('../model/user');
var mongo = require('mongoose');
var connect1 = mongo.createConnection('mongodb://127.0.0.1/mydb2');
var Schema = mongo.Schema;
var cardSchema = Schema({
    id1: {
        type: Number
        // unique: true
    },
    title: {
        type: String

    },
    created_at: {
       type: Date
   },
   updated_at: {
       type: Date
   },
   color: {
     type:String
   },
   reminder: {
       type: Date
   },
    bodyContent: {
        type: String

    },
    pin_note:
    {
      type:Boolean
    },
}, {
    collection: "cardData"
});
cardSchema.statics.setColors = function(id,color, cb) {

    this.findById(id, function(err, user) {
          // console.log("inside function",color);
        if (user) {
             console.log("user",user);
            // console.log(bodyData);
            user.color = color.color;
            // user.content = bodyData.content;
            user.save(cb);
        } else {
            cb('cant set color', err);
        }
    });
};
cardSchema.pre('save', function(next) {
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
cardSchema.statics.reminders = function(reminder, id, cb) {

    this.findById(id, function(err, user) {
        // console.log("inside function",reminder);
        if (user) {
            // console.log("user",user);
            // console.log(bodyData);
            user.reminder = reminder.time;
            // user.content = bodyData.content;
            user.save(cb);
        } else {
            cb('cant add reminder', err);
        }
    });
};

// Remove reminder
cardSchema.statics.removeReminder = function(id, cb) {

    this.findById(id, function(err, user) {
        // console.log(bodyData.title);
        if (user) {
            console.log(user);
            user.reminder = null;
            user.save(cb);
        } else {
            cb('cant remove reminder', err);
        }
    });
};
cardSchema.statics.addCardData = function(data, callback) {
    var self = this;
    var card = new self({
        id1:data.id1,
        title:data.title,
        bodyContent:data.bodyContent
    });
    card.save(callback);
}
cardSchema.statics.getCard=function(id,callback)
            {
console.log("id is", id);
                User.find({id1:id},callback);
              }
  cardSchema.statics.deleteCardData=function(id,callback)
  {
    User.remove({_id:id},callback);
  }
  cardSchema.statics.getCardData=function(id,callback)
  {
    User.find({_id:id},callback);
  }
  cardSchema.statics.updateCardData=function(data,callback)
  {
    // console.log("abccccccccccc");
    // var self = this;
    // var card = new self({
    //     title:data.title,
    //     bodyContent:data.bodyContent
    // });
    console.log(data);
     User.update({ _id: data.id }, { $set: {title:data.title,bodyContent:data.bodyContent}},callback);
    // card.save(callback);
  }
  cardSchema.statics.pinnedData= function(note_id,booleanvalue, callback)
  {
  // console.log("Boolean value",booleanvalue);
  this.update({
    _id: note_id
  }, {
    $set: {
pin_note:booleanvalue.value
    }
  }, callback);
}
  // cardSchema.statics.updateCardData=function(id,callback)
  // {
  //   User.update({_id:id},{$set:{'title':'New MongoDB Tutorial'},{'body':'sdfsf'}});
  // }
var User = connect1.model('User', cardSchema);
module.exports = User;
