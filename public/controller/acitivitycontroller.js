/* this controller will call when user  changes route*/
app.controller('activityController', ['$scope','$controller','getcardData', function($scope, $controller,getcardData)
{
//this controller is sub controller of activity controller
  $controller('todoController', {$scope: $scope})
    $scope.booleanval=true;
    $scope.inputbox=true;
    $scope.keep="Activities";
     $scope.today = new Date();
      $scope.navbar11={'background-color':'#6A6363'};
  $scope.getDataInfo = function()
{
  var httpobj = getcardData.getDataInfo();
  httpobj.then(function(response)
{
  $scope.records=response.data.msg;
  },function(response)
{

});
}
}]);
app.service("getcardData",function($http)
{
//activity api called
this.getDataInfo = function()
{
return $http({
url:"/activity",
method:"post"
  })
}
});
