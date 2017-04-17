// Parts of code: https://docs.angularjs.org/api/ngRoute/service/$route
angular.module('playlistModule', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/welcome', {
                templateUrl: './templates/welcome.html',
                controller: 'WelcomeController'
            })
            .when('/playlist', {
                templateUrl: './templates/playlist.html',
                controller: 'PlaylistController'
            })
            .when('/login', {
                templateUrl: './templates/login.html',
                controller: 'LoginController'
            })
            .when('/register', {
                templateUrl:'./templates/register.html',
                controller: 'RegisterController'
            })
            .otherwise({redirectTo:'/welcome'});

        $locationProvider.html5Mode(true);
    }).run(function($rootScope) {
        $rootScope.baseURL = 'http://104.196.62.142:8080/server_1/webapi';
    });
