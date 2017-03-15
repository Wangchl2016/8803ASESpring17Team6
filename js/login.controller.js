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
                console.log(response);
                if (response.hasOwnProperty('data') && response.data.hasOwnProperty('token')) {
                    alert("Valid! Got a token! "+response.data.token);
                } else {
                    alert("Login Failed");
                }
            }, function errorCallback(response) {
                if (response.status == 412) {
                    alert('Invalid Input: Please check that your email address is correct.');
                } else {
                    alert("Login Failed " + response.status);
                }
            });
            alert($scope.email+" "+$scope.password);
            return false;
        };
    });