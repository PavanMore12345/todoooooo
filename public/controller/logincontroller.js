/*loginController loaded when  route change */
app.controller('loginController', function($scope,$location,loginService,$state,toastr) {
            $scope.loginPage = function() {
                //read the username and password
                var user = $scope.user;
                console.log(user);
                var httpobj = loginService.loginPage(user);
                httpobj.then(function(response)
                 {
                    if(response.data.status)
                    {
                    //when data is matched it goes on todo page
                    toastr.success("login success");
                    $state.go('todo');
                    // $state.go("todopage");
                  }
                  else {
                  //when email or password is wrong it will go on login page
                    $state.go('login');
                    $scope.user="";
                  }

                }, function(response) {

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
