angular.module('playlistModule')

    .controller('LoginController', function($scope, $http, $rootScope, $location) {
        $scope.result = "Nothing Yet";

        $scope.login = function (loginForm) {
            if (!loginForm.$valid) {
                alert("Please enter a valid email address and password.");
                return false;
            }
            $http({
                method: 'GET',
                url: $rootScope.baseURL+'/users/login?email='+encodeURIComponent($scope.email)+
                //url: $rootScope.baseURL+'/users/login?email='+encodeURIComponent($scope.email)+
                    '&password='+encodeURIComponent($scope.password)
            }).then(function successCallback(response, status) {
                console.log(response);
                //if (response.hasOwnProperty('data') && response.data.hasOwnProperty('token')) {
                if (response.hasOwnProperty('data')) {
                    if (response.data == 0)
                        $scope.result = "Login failed! Invalid username and password.";
                    else{
                        $scope.result = "Valid! Got a token!";// "+response.data.token);
                        //$location.path('/playlist');
                        //$location.path('/main');
                        //window.location.href = '/main';
                    }

                } else {
                    alert("Server Error.");
                }
            }, function errorCallback(response) {
                if (response.status == 412) {
                    $scope.result = 'Invalid Input: Please check that your email address is correct.';
                } else {
                    $scope.result = "Login Failed " + response.status;
                    //alert("response "+JSON.stringify(response));

                }
            });
            //alert($scope.email+" "+$scope.password);
            return false;
        };

    });
