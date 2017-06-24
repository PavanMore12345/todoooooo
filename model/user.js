var mongo=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var validators= require('mongoose-validators');
var mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;
var mongooseFieldEncryption1 = require('mongoose-field-encryption');
var connect1 = mongo.connect('mongodb://127.0.0.1/mydb2');

autoIncrement.initialize(connect1);
var Schema = mongo.Schema;
var userSchema = Schema({
  _id:
   {
     type: Number,
    // unique:true
  },
  email: {
    type:String,
    //required:true,
    //unique: true,
    lowercase: true,
    validate:validators.isEmail()
  },
  password: {
    type: String,
    // required: true,
    match:new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
  },
  username: {
    type: String,
    // required: true,
    validate: [validators.isAlphanumeric(), validators.isLength(4, 60)]
  },
  references:
   {
   author: String,
   date: Date
 },
 originalImage: {
       type:String
   },
   cropedImage: {
     type:String
   }

,
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
   google: {

       id: String,
       access_token: String,
       firstName: String,
       lastName: String,
       email: String,
       gender: String,
       profile: String
   }
}
,{collection: "userReg"});
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
userSchema.plugin(mongooseFieldEncryption, {fields: ['password'], secret:'some secret key'});
//var User = connect1.model('User', userSchema);
userSchema.statics.checklogin = function(bodydata,callback) {
var email1 = bodydata.email;
var encrypted = mongooseFieldEncryption1.encrypt(bodydata.password, 'some secret key');
this.findOne({email:email1,password:encrypted}, callback);
//console.log(this.findOne({email:email1,password:encrypted}));
};

userSchema.statics.saveUser = function(data , callback){
//  console.log("dssfsfs");
console.log(data);
  var self =this;
self.findOne({email:data.email},function(err,exist)
{
  if(exist)
  {
  callback("email is already used",null);
  }
  else
   {
    var newUser=new self(data);
    console.log("obj",newUser);
    newUser.save(callback);
    console.log("sdfsfs");
  }
});
}
userSchema.statics.userProfile=function(data,callback)
{
  var self=this;
  self.findById(data.id, callback );
  //  console.log("findbyid");

      //console.log(req.decoded.Userobj.email);
}
userSchema.statics.uploadProfilePic = function(userId, url, cb) {

    this.findById(userId, function(err, user) {
        // console.log("inside function",user);
        if (user) {

            console.log("user",user);
            user.originalImage = url.original;
            user.cropedImage = url.croped;
            // user.content = bodyData.content;
            console.log("check",url.original);
            user.save(cb);
        } else {
            cb('cant set color', err);
        }
    });
  }
    // userSchema.statics.getUserData = function(id,callback)
    //             {
    // console.log("id is", id);
    //                 User.find({id1:id},callback);
    //               }
    //               userSchema.virtual('u_id').get(function() {
    //                   return this.id.toString();
    //               });
    //               userSchema.set('toJSON', {
    //                   virtuals: true,
    //                   transform: function(doc, ret, options) {
    //                       ret.u_id = ret._id;
    //
    //                       if(ret.fb||ret.google||ret.local)
    //                       if (ret.fb && ret.fb.profile) {
    //                           ret.fb.profile = JSON.parse(ret.fb.profile);
    //                       }
    //                       else
    //                       if (ret.google && ret.google.profile) {
    //                           ret.google.profile = JSON.parse(ret.google.profile);
    //                       }
    //                       else
    //                       if (ret.local && ret.local.profile) {
    //                           ret.local.profile = JSON.parse(ret.local.profile);
    //                       }
    //                       delete ret._id;
    //                       return ret;
    //                   }
    //               });
var User = connect1.model('User', userSchema);
module.exports=User;
