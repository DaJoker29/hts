angular.module('hts', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/' {
                templateUrl: '/views/index',
            });
        $locationProvider.html5Mode(true);
    }]);
