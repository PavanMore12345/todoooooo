app.controller('signupController',function($scope,$location,signupService,$state) {
            $scope.signupPage = function() {
              console.log("SDfssds");
                var user = $scope.user;
                var obj={'user':user};
                var httpobj = signupService.signupPage(user);
                httpobj.then(function(response) {
                    console.log(response);
                    alert("signup success");
                    //$state.go("login");
                    $state.go('login');
                }, function(response) {
                    // this function handles error
                });
            }


          });
          app.service("signupService", function($http) {
              this.signupPage = function(user) {
                  return $http({
                      url: "/signup",
                      method: "post",
                      data: user
                  });
              }
          });
