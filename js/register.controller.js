angular.module('playlistModule')

    .controller('RegisterController', function($scope, $rootScope) {
        $scope.url = $rootScope.baseURL;
        $scope.url2 = "hey";
    });