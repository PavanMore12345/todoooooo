app.controller('activityController', ['$scope','$controller','getcardData', function($scope, $controller,getcardData)
{
  $controller('todoController', {$scope: $scope})
    $scope.booleanval=true;
    console.log("activity");
      $scope.navbar11={'background-color':'#1CEAE7'};
  $scope.getDataInfo = function()
{
  console.log("get");
  var httpobj12 = getcardData.getDataInfo();
  httpobj12.then(function(response)
{
  $scope.records=response.data.msg;
  console.log($scope.records);
  console.log(response);
  },function(response)
{

});
}
}]);
app.service("getcardData",function($http)
{
this.getDataInfo = function()
{
return $http({
url:"/activity",
method:"post"
  })
}
});
