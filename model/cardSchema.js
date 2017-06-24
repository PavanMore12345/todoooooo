var express = require('express'),
    app = express(),
    router = express.Router();
var mongo = require('mongoose');
var noteInfo=require('./activitySchema');
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
archive:{
  type:Boolean
},
bgcolor:
{
  type:String
},
noteData:
{
  type:String
},
pinInfo:
{
  type:String
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
            // var note=new noteInfo();
            // note.id1=user.id1;
            // note.data="hello";
            // note.save();

           //var title=user.title;
            var note = new noteInfo({
                id1:user.id1,
                data:user.title + " set the color"

            });
            note.save().then(function(out){
              //console.log("resultDASCSDVDS",out);
            }).catch(function(err){
              console.log("err",err);
            })


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
          var note = new noteInfo({
              id1:user.id1,
              data:user.title + "set the reminder as a"+reminder.time

          });
          note.save().then(function(out){
            //console.log("resultDASCSDVDS",out);
          }).catch(function(err){
            console.log("err",err);
          })
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
          var note = new noteInfo({
              id1:user.id1,
              data:user.title+" remove the reminder "

          });
          note.save().then(function(out){
            //console.log("resultDASCSDVDS",out);
          }).catch(function(err){
            console.log("err",err);
          })
            console.log(user);
            user.reminder = null;
            user.save(cb);
        } else {
            cb('cant remove reminder', err);
        }
    });
};
cardSchema.statics.addCardData = function(data, callback) {
  console.log(data);
    var self = this;
    var card = new self({
        id1:data.id1,
        title:data.title,
        bodyContent:data.bodyContent
    });
    var note = new noteInfo({
        id1:data.id1,
        data:data.title+" added the card "

    });
    note.save().then(function(out){
      //console.log("resultDASCSDVDS",out);
    }).catch(function(err){
      console.log("err",err);
    })
    card.save(callback);
}
cardSchema.statics.getCard=function(id,callback)
            {
console.log("id is", id);
                User.find({id1:id},callback);
              }
  cardSchema.statics.deleteCardData=function(id,callback)
  {
    this.findById(id, function(err, user) {
      console.log("user",user);
    var note = new noteInfo({
        id1:user.id1,
      data:user.title+"deleted card "

    });
    note.save().then(function(out){
      //console.log("resultDASCSDVDS",out);
    }).catch(function(err){
      console.log("err",err);
    })
    User.remove({_id:id},callback);
  });

  }
  cardSchema.statics.getCardData=function(id,callback)
  {
    console.log("iddddd",id);
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
    var note = new noteInfo({
        id1:user.id1,
        data:user.title+" upadated the card "
    });
    note.save().then(function(out){
      console.log("resultDASCSDVDS",out);
    }).catch(function(err){
      console.log("err",err);
    })
    console.log(data);
     User.update({ _id: data.id }, { $set: {title:data.title,bodyContent:data.bodyContent}},callback);
    // card.save(callback);
  }
  cardSchema.statics.pinnedData= function(note_id,booleanvalue,id, callback)
  {
  console.log("Boolean value",booleanvalue);
  this.findById(note_id, function(err, user) {
  var note = new noteInfo({
      id1:id,
      data:user.title+" pinned the card"
  });
  note.save().then(function(out){
    console.log("resultDASCSDVDS",out);
  }).catch(function(err){
    console.log("err",err);
  })
});
  console.log("callback",callback);
  this.update({
    _id: note_id
  }, {
    $set: {
pin_note:booleanvalue.value,
 archive:booleanvalue.removearchive
    }
  }, callback);
  //console.log("user",user);
}
cardSchema.statics.archiveNote= function(noteId,booleanvalue,id,callback) {
  // console.log("Archive val",booleanvalue);
  this.findById(noteId, function(err, user) {
  var note = new noteInfo({
      id1:id,
      data:user.title+" archieved the Note "
  });
  note.save().then(function(out){
    // console.log("resultDASCSDVDS",out);
  }).catch(function(err){
    console.log("err",err);
  })
});
  this.update({
    _id: noteId
  }, {
    $set: {
      archive:booleanvalue.value,
     pin_note:booleanvalue.pin
    }
  }, callback);
}
// cardSchema.statics.noteStatus = function(data, callback) {
//     var self = this;
//     var note = new self({
//      noteData:data.note
//     });
//     card.save(callback);
// }
  // cardSchema.statics.updateCardData=function(id,callback)
  // {
  //   User.update({_id:id},{$set:{'title':'New MongoDB Tutorial'},{'body':'sdfsf'}});
  // }
var User = connect1.model('User', cardSchema);
module.exports = User;
