/*
 * userSchema.js
 * @path model/user.js
 * @file user.js
 */
var mongo = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var validators = require('mongoose-validators');
var mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;
var mongooseFieldEncrypt = require('mongoose-field-encryption');
var logger = require('winston');
var connect = mongo.connect('mongodb://127.0.0.1/mydb2');
autoIncrement.initialize(connect);
var Schema = mongo.Schema;
//schema for user,facebook,google login
var userSchema = Schema({
    _id:
     {
        type: Number,
     },
    email:
     {
        type: String,
        lowercase: true,
        validate: validators.isEmail()
     },
    password:
    {
        type: String,
        match: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
    },
    username:
    {
        type: String,
        validate: [validators.isAlphanumeric(), validators.isLength(4, 60)]
    },
    references:
    {
        author: String,
        date: Date
    },
    originalImage:
    {
        type: String
    },
    cropedImage:
    {
        type: String
    },
    fb:
     {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String,
        gender: String,
        profile: String
     },
    google:
    {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String,
        gender: String,
        profile: String
    }
}, {
    collection: "userReg"
});
//it automatically increment id by one.
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
// it decrypt the password.
userSchema.plugin(mongooseFieldEncryption, {
    fields: ['password'],
    secret: 'some secret key'
});
// it check the particular user login or not
userSchema.statics.checklogin = function(bodydata, callback) {
    var email1 = bodydata.email;
    var encrypted = mongooseFieldEncrypt.encrypt(bodydata.password, 'some secret key');
    this.findOne({
        email: email1,
        password: encrypted
    }, callback);
};
// it saves the user into database
userSchema.statics.saveUser = function(data, callback) {
       var self = this;
       self.findOne({
        email: data.email
       },function(err, exist) {
       if (exist) {
       callback("email is already used", null);
        } else {
        var newUser = new self(data);
        newUser.save(callback);
        }
    });
}
// it retrives the information from the database
userSchema.statics.userProfile = function(data, callback)
{
    var self = this;
    self.findById(data.id, callback);
}
// it stores the image into the database.
userSchema.statics.uploadProfilePic = function(userId, url, cb) {

    this.findById(userId, function(err, user)
    {
        //it stores the original image and croped image into the database
        if (user)
        {
            user.originalImage = url.original;
            user.cropedImage = url.croped;
            user.save(cb);
        } else
        {
            cb('cant set color', err);
        }
    });
}
var User = connect.model('User', userSchema);
module.exports = User;
