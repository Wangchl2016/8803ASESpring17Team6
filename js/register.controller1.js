/**
 * Created by Poul on 3/25/17.
 */

angular.module('playlistModule')

    .controller('RegisterController1', function($scope, $http, $rootScope) {
        $scope.register = function (registerForm) {
            if (!registerForm.$valid) {
                alert("Please enter valid name, email address and password.");
                return false;
            }
            var user = {
                'name' : $scope.firstname +" " + $scope.lastname,
                'email' : $scope.email,
                'password' : $scope.password
            };
            $http({
                method: 'POST',
                url: $rootScope.baseURL+'/api/users',
                data: user
            }).then(function successCallback(response, status) {
                console.log(response);
                // //alert("server reply: "+response.data.email +" register successful!");
                // // show response
                // alert("response "+JSON.stringify(response.data));
                if (response.hasOwnProperty('data') && response.data.hasOwnProperty('token')) {
                    if (response.data.token == 0)
                        alert("Register failed! User existed");
                    else{
                        alert("Valid! Got a token! "+response.data.token);
                        window.location.href = '/main';
                    }
                } else {
                    alert("Register Failed");
                }

            }, function errorCallback(response) {
                alert("Register Failed " + response.status);
                // alert("response "+JSON.stringify(response));
            });

            alert("local echo: "+$scope.email+" "+$scope.password+" "+$scope.firstname +" "+$scope.lastname);
            return false;
        };
    });