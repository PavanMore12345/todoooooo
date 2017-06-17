// app.service('addData', function($http) {
//     this.app = function(dataContent) {
//         return $http({
//             url: "/addData",
//             method: "post",
//             data: dataContent
//         })
//     };
// }).service('getCard', function($http) {
//     this.app = function() {
//         return $http({
//             url: "/getData",
//             method: "post"
//         })
//     };
// }).service('logout', function($http) {
//     this.app = function() {
//         return $http({
//             url: "/logout",
//             method: "get"
//         })
//     };
// }).service('remove', function($http) {
//     this.app = function(id) {
//         return $http({
//             url: "/removeData/" + id + "",
//             method: "delete"
//         })
//     };
// }).service('loginService',function($http){
//   this.app=function(loginData){
//     return $http({
//       url:"/login",
//       method:"post",
//       data:loginData
//     })
//   };
// }).service('signupService',function($http){
//   this.app=function(signupData){
//     return $http({
//       url:"/signup",
//       method:"post",
//       data:signupData
//     })
//   }
// }).service('userinfo',function($http){
//   this.app=function(loginData){
//     return $http({
//       url:"/userInfo",
//       method:"post"
//     })
//   };
// }).service('updateData',function($http){
//   this.app=function(cardData,id){
//     return $http({
//       url:"/updateData/" + id + "",
//       method:"post",
//       data:cardData
//     })
//   };
// }).service('reminders',function($http){
//   this.app=function(reminder,id){
//     // console.log(reminder,id);
//     return $http({
//       url:"/reminders/" + id + "",
//       method:"post",
//       data:reminder
//     })
//   };
// }).service('removeReminder',function($http){
//   this.app=function(id){
//     // console.log(id);
//     return $http({
//       url:"/reminders/" + id + "",
//       method:"post"
//     })
//   };
// }).service('setColor',function($http){
//   this.app=function(id,colorObj){
//     // console.log(colorObj);
//     // console.log(id);
//     return $http({
//       url:"/setColor/" + id + "",
//       method:"post",
//       data:colorObj
//     })
//   };
// });
app.service('todoService',function($http){
  this.app=function(url,method,data){
    // console.log(data);
    // console.log(id);
    return $http({
      url:url,
      method:method,
      data:data,
    })
  };
});
