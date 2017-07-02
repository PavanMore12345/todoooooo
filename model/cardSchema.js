/*
 * card Schema
 * @path model/activitySchema.js
 * @file activitySchema.js
 */

var express = require('express'),
    app = express(),
    router = express.Router();
var mongo = require('mongoose');
var noteInfo = require('./activitySchema');
var connect = mongo.createConnection('mongodb://127.0.0.1/mydb2');
var Schema = mongo.Schema;
//schema for user
var cardSchema = Schema({
    id:
    {
        type: Number
        // unique: true
    },
    title:
    {
        type: String
    },
    created_at:
    {
        type: Date
    },
    updated_at:
    {
        type: Date
    },
    color:
    {
        type: String
    },
    reminder:
    {
        type: Date
    },
    bodyContent:
    {
        type: String
    },
    archive:
    {
        type: Boolean
    },
    bgcolor:
    {
        type: String
    },
    noteData:
    {
        type: String
    },
    pinInfo:
    {
        type: String
    },
    pin_note:
    {
        type: Boolean
    },
}, {
    collection: "cardData"
   });
// set color has stored into the databse
cardSchema.statics.setColors = function(id, color, cb) {
    //set the color activity into the database
    this.findById(id, function(err, user) {
        if (user) {
            var note = new noteInfo({
                id: user.id,
                title:user.title,
                data: " set the color"
            });
            note.save().then(function(out) {}).catch(function(err) {
                console.log("err", err);
            })
            //read the color code
            user.color = color.color;
            //store into the database
            user.save(cb);
        } else
         {
            cb('cant set color', err);
         }
    });
};
//hook method to set currentTime and Update time
cardSchema.pre('save', function(next)
{
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
    this.created_at = currentDate;
    next();
});
// set the reminders into the database
cardSchema.statics.reminders = function(reminder, id, cb)
{

    this.findById(id, function(err, user)
    {

        if (user)
        {
            var note = new noteInfo({
                id: user.id,
                title:user.title,
                data: "set the reminder"

            });
            note.save().then(function(out) {

            }).catch(function(err) {
                console.log("err", err);
            })
            user.reminder = reminder.time;
            user.save(cb);
        } else
         {
            cb('cant add reminder', err);
        }
    });
};

// Remove reminder from the database
cardSchema.statics.removeReminder = function(id, cb)
{

    this.findById(id, function(err, user)
    {

     if (user)
        {
            var note = new noteInfo({
                id: user.id,
                title:user.title,
                data:"remove the reminder"

            });
            note.save().then(function(out)
            {

            })
            user.reminder = null;
            user.save(cb);
        }
        else
         {
            cb('cant remove reminder', err);
          }
    });
};
// add the card into the database
cardSchema.statics.addCardData = function(data, callback)
{
    var self = this;
    // read the data from user
    console.log("addcrad",data.id);
    var card = new self
    ({
        id: data.id,
        title: data.title,
        bodyContent: data.bodyContent
    });
    //store the activity into the database
    var note = new noteInfo({
        id: data.id,
        title:data.title,
        data:" added the card "
    });
    note.save().then(function(out)
    {

    }).catch(function(err) {

    })
    card.save(callback);
}
// get the card store in the database
cardSchema.statics.getCard = function(id, callback)
 {
     // find data of particular id return all the data.
    User.find({
        id: id
    }, callback);
 }
 //delete the card from database
cardSchema.statics.deleteCardData = function(id, callback) {

    this.findById(id, function(err, user)
    {
     //store the activity deleted from database in activitySchema
        var note = new noteInfo({
            id: user.id,
            title:user.title,
            data:"deleted card"
        });
        note.save().then(function(out)
        {

        }).catch(function(err)
        {
            console.log("err", err);
        })
        //it removes particular card of particular id
        User.remove({
            _id: id
        }, callback);
    });
}
// store the upadated card into the database
cardSchema.statics.updateCard = function(bodyData, id, callback) {
    if (bodyData.title == undefined && bodyData.bodyContent == undefined)
    {
        //callback("input undefine", null);
        return;
    }
    this.findById(id, function(err, user)
    {
        if (user)
        {
            //read data from user
            user.title = bodyData.title;
            user.bodyContent = bodyData.bodyContent;
            //sending callback to controller
            user.save(callback);
        } else
        {
     //  callback('cant update', err);
        }
    });
};
// get the card from database
cardSchema.statics.getCardData = function(id, callback)
{
    User.find({
        _id: id
    }, callback);
}
// store the pinned card into the database
cardSchema.statics.pinnedData = function(note_id, booleanvalue, id, callback) {
    this.findById(note_id, function(err, user) {
     // store the pinned the activity into the database.
        var note = new noteInfo({
            id: id,
            title:user.title,
            data:" pinned the card"
        });
        note.save().then(function(out) {

        }).catch(function(err) {

        })
    });

    this.update({
        _id: note_id
    }, {
        $set:
        {
            pin_note: booleanvalue.value,
            archive: booleanvalue.removearchive
        }
    }, callback);
}
// store the archive note into the database
cardSchema.statics.archiveNote = function(noteId, booleanvalue, callback) {

    this.findById(noteId, function(err, user) {
        var note = new noteInfo({
            id: noteId,
            title:user.title,
            data:" archieved the Note "
        });
        note.save().then(function(out) {

        }).catch(function(err) {

        })
    });
    //store archive value into the database
    this.update({
        _id: noteId
    }, {
        $set: {
            archive: booleanvalue,
             pin_note:booleanvalue.pin
        }
    }, callback);
}
var User = connect.model('User', cardSchema);
module.exports = User;
