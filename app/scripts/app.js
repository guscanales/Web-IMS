'use strict';

angular
  .module('imsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        resolve:{
          "check":function($location, $rootScope)
          {
            if($rootScope.loggedin)
            {
              $location.path('/dashboard');
            }
          }
        },
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/dashboard', {
        resolve:{
          "check":function($location, $rootScope)
          {
            if(!$rootScope.loggedin)
            {
              $location.path('/');
            }
          }
        },
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
