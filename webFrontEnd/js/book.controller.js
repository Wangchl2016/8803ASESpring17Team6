angular.module('playlistModule')

    .controller('BookController', function($scope, $routeParams) {
        $scope.name = 'BookController';
        $scope.params = $routeParams;
    });