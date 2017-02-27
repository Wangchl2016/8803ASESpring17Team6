angular.module('playlistModule')

    .controller('ChapterController', function($scope, $routeParams) {
        $scope.name = 'ChapterController';
        $scope.params = $routeParams;
    });