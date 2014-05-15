'use strict';

angular
  .module('iconSpaceTesterApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngTouch',
    'ui.bootstrap',
    'iconControllers',
    'iconServices'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'iconLoadCtrl'
      })
      .when('/test/:testId', {
        templateUrl: 'views/test.html',
        controller: 'iconTestCtrl'
      })
      .when('/stat', {
        templateUrl: 'views/stat.html',
        controller: 'statCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
