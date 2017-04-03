angular.module('playlistModule')

    .controller('LoginController', function($scope, $http, $rootScope, $location) {

        $scope.login = function (loginForm) {
            if (!loginForm.$valid) {
                alert("Please enter a valid email address and password.");
                return false;
            }
            $http({
                method: 'GET',
                url: $rootScope.baseURL+'/api/users/login?email='+encodeURIComponent($scope.email)+
                //url: $rootScope.baseURL+'/users/login?email='+encodeURIComponent($scope.email)+
                    '&password='+encodeURIComponent($scope.password)
            }).then(function successCallback(response, status) {
                console.log(response);
                if (response.hasOwnProperty('data') && response.data.hasOwnProperty('token')) {
                    if (response.data.token == 0)
                        alert("Login failed! Invalid server reply");
                    else{
                        alert("Valid! Got a token! "+response.data.token);
                        //$location.path('/playlist');
                        //$location.path('/main');
                        window.location.href = '/main';
                    }

                } else {
                    alert("Login Failed");
                }
            }, function errorCallback(response) {
                if (response.status == 412) {
                    alert('Invalid Input: Please check that your email address is correct.');
                } else {
                    alert("Login Failed " + response.status);
                    alert("response "+JSON.stringify(response));

                }
            });
            alert($scope.email+" "+$scope.password);
            return false;
        };

    });
