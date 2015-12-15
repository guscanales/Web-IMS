'use strict';

angular.module('imsApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, AuthenticationService) {
    AuthenticationService.ClearCredentials();

        $scope.login = function () {

            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.id!="")
                {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $rootScope.loggedin = true;
                    $location.path('/dashboard');
                }
                else
                {
                    $scope.error = response.message;
                    $rootScope.loggedin = fasle;
                    alert('Credenciales Incorrectas');
                    $location.path('/');
                    $scope.dataLoading = false;
                }
            });
        };
  });
