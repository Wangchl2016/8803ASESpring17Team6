angular.module('playlistModule')

    .controller('LoginController', function($scope, $http, $rootScope) {
        $scope.login = function (loginForm) {
            if (!loginForm.$valid) {
                alert("Please enter a valid email address and password.");
            }
            $http({
                method: 'GET',
                url: $rootScope.baseURL+'/api/users/login?email='+encodeURIComponent($scope.email)+
                    '&password='+encodeURIComponent($scope.password)
            }).then(function successCallback(response, status) {
                if (response.hasOwnProperty('token')) {
                    alert("Valid! Got a token! "+response.token);
                } else {
                    alert("Login Failed");
                }
            }, function errorCallback(response, status) {
                alert("Login Failed "+status);
            });
            alert($scope.email+" "+$scope.password);
            return false;
        };
    });