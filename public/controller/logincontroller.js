// var app = angular.module('scotchApp', []);
app.controller('loginController', function($scope,$location,loginService,$state) {
            $scope.loginPage = function() {
              console.log("SDfssds");
                var user = $scope.user;
                console.log(user);
                var httpobj = loginService.loginPage(user);
                httpobj.then(function(response)
                 {
                    if(response.data.status)
                    {
                    //$state.go("home");
                    //alert("login success");
                    toastr.success("login success");
                    $state.go('todo');
                    // $state.go("todopage");
                  }
                  else {
                    // console.log("fgfgfd");
                    // $location.path("/signup");
                    $state.go('login');
                    $scope.user="";
                  }
                    // $scope.user="";
                }, function(response) {
                    // this function handles error
                });
            }


          });
          app.service("loginService", function($http) {
              this.loginPage = function(user) {
                  return $http({
                      url: "/login",
                      method: "post",
                      data: user
                  });
              }
          });
