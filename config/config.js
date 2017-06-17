/**
 * @description Checks the system errors & returns true if system/programming errors
 * @param {any} err type object/string
 * @returns Boolean true/false
 */
 var express = require('express'),
 router = express.Router();

var errdefined={"validationSchema":{
  "login": {
        "email": { in: "body",
            notEmpty: {
                errorMessage: 'emailid field is require & cannot be blank.'
            },
             isEmail:{
              errorMessage:'emailid is not valid.'
            }
        },
        "password": { in: "body",
            notEmpty: {
                errorMessage: 'password field is require & cannot be blank.'
            },
          matches:
          {
            options:[/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/, "i"]
          },
            errorMessage:'password is not valid.'
        }
      },
    "signup":{
      "email": {
         in: "body",
          notEmpty: {
              errorMessage: 'emailid field is require & cannot be blank.'
          },
          isEmail:{
           errorMessage:'emailid is not valid.'
         }
      },
      "password": { in: "body",
          notEmpty: {
              errorMessage: 'password field is require & cannot be blank.'
          },
          matches:
          {
            options:[/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/, "i"]
          },
            errorMessage:'password is atleast one alphabet,special symbols,numeric,and upper case letters'
      },
      "username":{in:"body",
    notEmpty:
  {
    errorMessage:'username cannot be blank'
  },
  matches:
  {
    options:[/^(?=(?![0-9])[A-Za-z0-9]+[._-]?[A-Za-z0-9]+).{3,20}/, "i"]
  },
    errorMessage:'username is not valid'
}
    }
},
checkSystemErrors : function(err) {
return err instanceof TypeError ||
    err instanceof SyntaxError ||
    err instanceof EvalError ||
    err instanceof RangeError ||
    err instanceof ReferenceError;
}
}
/**
 * @description Default return object for all the other system/Programming errors
 * @key status @value false
 * @key message @value Something Bad Happened. Please contact system administrator.
 */




///Controller


module.exports=errdefined;
