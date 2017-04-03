// Parts of code: https://docs.angularjs.org/api/ngRoute/service/$route
angular.module('playlistModule', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            // Loren Routes Below Here (these comments prevent git from getting confused)
            .when('/Book/:bookId', {
                templateUrl: './templates/book.html',
                controller: 'BookController',
                resolve: {
                    // I will cause a 1 second delay
                    delay: function($q, $timeout) {
                        var delay = $q.defer();
                        $timeout(delay.resolve, 1000);
                        return delay.promise;
                    }
                }
            })
            .when('/welcome', {
                templateUrl: './templates/welcome.html',
                controller: 'WelcomeController'
            })
            .when('/playlist', {
                templateUrl: './templates/playlist.html',
                controller: 'PlaylistController'
            })
            .when('/register', {
                templateUrl: './templates/register.html',
                controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: './templates/login.html',
                controller: 'LoginController'
            })
            //  Ashfaq Dawood Below Here

            // Shaobo Zhang Below Here
            .when('/register1', {
                templateUrl:'./templates/register1.html',
                controller: 'RegisterController1'
            })
            .when('/main', {
                templateUrl:'./templates/main.html',
                controller: 'MainPageController'
            })
            // Chunlin Wang Below Here

            // Final route here (to get the semicolon)

            .when('/Book/:bookId/ch/:chapterId', {
                templateUrl: './templates/chapter.html',
                controller: 'ChapterController'
            })
            .otherwise({redirectTo:'/welcome'});



        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    }).run(function($rootScope) {
        $rootScope.baseURL = 'http://klingmandesign.com/ase/public/';
        //$rootScope.baseURL = 'http://35.185.54.236:8080/server_1/webapi';
        // instance-injector
                                   // This is an example of a run block.
                                   // You can have as many of these as you want.
                                   // You can only inject instances (not Providers)
                                   // into run blocks
    }).factory('Entry', function($resource) {
        // https://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
        return $resource('/api/entries/:id'); // Note the full endpoint address
    });