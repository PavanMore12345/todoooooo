app.controller('deleteController', ['$scope', '$controller', function($scope, $controller){
  $controller('todoController', {$scope: $scope})
  //inside scope you the controllerOne scope will available
  //$scope.booleanvalue=false;
  $scope.deleteval=true;
  console.log("archive");
    $scope.navbar11={'background-color':'#6A6363'};
}]);
