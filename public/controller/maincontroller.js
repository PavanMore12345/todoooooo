/*mainController is loaded when body is get loaded*/
app.controller('mainController', function($http,$state,$scope,$rootScope,toastr) {
  var url='/userprofile';
  $http.post(url)
.then(
function(response){
  if(response.data.status==true)
  {
  //it will send user information  when user is successfully login
  console.log("response",response.data);
$rootScope.profilepic = response.data.croped;
$rootScope.user_id=response.data.id;
$rootScope.userName=response.data.username;
$scope.userEmail=response.data.email;
    $state.go("todo");
    return;
}else {
$state.go("login");
}
},
function(response){
 // failure call back
}
);
});
