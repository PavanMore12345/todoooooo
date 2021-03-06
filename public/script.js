//var scotchApp = angular.module('scotchApp', []);
var app = angular.module('app', ['ui.router','angular-lazyload','ngSanitize', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ngImgCrop','satellizer','toastr'])
  .config(function($stateProvider, $urlRouterProvider) {


    $stateProvider.state('todo', {
        url: '/todo',
        templateUrl: 'template/todo.html',
         controller: 'todoController'

      })
      .state('login', {
        url: '/login',
        templateUrl: 'template/login.html',
         controller: 'loginController'

      }).state('signup', {
        url: '/signup',
        templateUrl: 'template/signup.html',
         controller: 'signupController',
        // onEnter: function() {
        //   console.log('inside signup');
        // }
      }).state('archive', {
        url: '/archieve',
        templateUrl: 'template/todo.html',
         controller: 'archieveController',
       }).state('activity', {
         url: '/activity',
         templateUrl: 'template/todo.html',
          controller: 'activityController',
        }).state('delete', {
          url: '/deletedata',
          templateUrl: 'template/delete.html',
           controller: 'deleteController',
         })
    $urlRouterProvider.otherwise('/login');
  })
       app.directive('contenteditable1', [function() {
    return {
        require: '?ngModel',
        scope: {
        },
        link: function(scope, element, attrs, ctrl) {
            // view -> model (when div gets blur update the view value of the model)
            element.bind('blur', function() {
                scope.$apply(function() {
                    ctrl.$setViewValue(element.html());
                });
            });

            // model -> view
            ctrl.$render = function() {
                element.html(ctrl.$viewValue);
            };

            // load init value from DOM
            ctrl.$render();

            // remove the attached events to element when destroying the scope
            scope.$on('$destroy', function() {
                element.unbind('blur');
                element.unbind('paste');
                element.unbind('focus');
            });
        }
    };
    
}]);
