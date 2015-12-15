'use strict';

/**
 * @ngdoc function
 * @name imsApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the imsApp
 */
angular.module('imsApp')
  .controller('RegisterCtrl', function ($scope, AuthenticationService, $rootScope, $location) {
    $scope.register = function () {
      $scope.alerts = [];
        $scope.dataLoading = true;

        if($scope.password == $scope.password2)
        {
          AuthenticationService.Exists($scope.username, function(response) {
              if(response.id!="")
              {
                $scope.alerts.push({type:'danger', msg: 'Cuenta de correo ya ha sido utilizada'});
                  $rootScope.loggedin = false;
              }
            };
          AuthenticationService.Register($scope.username, $scope.password, function(response) {
              if(response.id!="")
              {
                  AuthenticationService.SetCredentials($scope.username, $scope.password);
                  $rootScope.loggedin = true;
                  $location.path('/dashboard');
              }
              else
              {
                  $scope.alerts.push({type:'danger', msg: 'No se ha podido crear la cuenta.'});
                  $scope.error = response.message;
                  $rootScope.loggedin = fasle;
                  $location.path('/');
                  $scope.dataLoading = false;
              }
          });
        }
        else
        {
        $scope.alerts.push({type:'danger', msg: 'No concuerda la contraseña.'});
        }
    };
  });
