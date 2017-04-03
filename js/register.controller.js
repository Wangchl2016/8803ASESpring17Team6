angular.module('playlistModule')

    .controller('RegisterController', function($scope, $http, $rootScope, $location) {
        $scope.register = function (regForm) {
            if (!regForm.$valid) {
                alert("Please enter a valid email address and password.");
                return false;
            }
            if ($scope.password != $scope.password2) {
                alert("Password and Confirm Password do not match!");
                $scope.password = '';
                $scope.password2 = '';
                return false;
            }
            var user = {
                'name': $scope.name,
                'email': $scope.email,
                'password': $scope.password
            };
            $http({
                method: 'POST',
                url: $rootScope.baseURL+'/users',
                data: user
            }).then(function successCallback(response, status) {
                console.log(response);
                if (response.hasOwnProperty('data') && response.data.hasOwnProperty('email') && response.data.email == $scope.email) {
                    alert("Congratulations! You've registered!");
                    $location.path('/login');
                } else {
                    alert("Registration Failed");
                }
            }, function errorCallback(response) {
                if (response.status == 412) {
                    alert('Invalid Input: Please check that your email address is correct.');
                } else {
                    alert("Registration Failed " + response.status);
                }
            });
            return false;
        };
    });
