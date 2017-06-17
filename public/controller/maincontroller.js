app.controller('mainController', function($http,$state,$scope,$rootScope) {
  var url='/userprofile';
  $http.post(url)
.then(
function(response){
  console.log(response.data);

  if(response.data.status==true)
  {
  //  console.log(response.data.status);
//console.log("checkdata",response.data);
$rootScope.profilepic = response.data.croped;
$rootScope.user_id=response.data.id;
$rootScope.userName=response.data.username;
$scope.userEmail=response.data.email;
console.log("data  ",response.data);
    $state.go("todo");
    return;
  //console.log(response);
}else {
$state.go("login");
}
},
function(response){
 // failure call back
}
);
});
