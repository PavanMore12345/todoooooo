app.controller('archieveController', ['$scope', '$controller', function($scope, $controller){
  $controller('todoController', {$scope: $scope})
  //inside scope you the controllerOne scope will available
  $scope.booleanvalue=false;
  console.log("archive");
    $scope.navbar11={'background-color':'#607d8b'};
  
}]);
