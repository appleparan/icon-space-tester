'use strict';

var iconServices = angular.module('iconServices', ['ngResource']);
var iconControllers = angular.module('iconControllers', ['ngRoute', 'ngTouch']);

iconServices.constant('numTestPerSection', 8);
iconServices.constant('numTestPerShape', 3);
iconServices.constant('numTestPerDistance', 3);

iconServices.factory('timeData', function timeDataFactory() {
  var elapsedTime = {};
  var score = 0;

  return {
    getElapsedTime: function() {
      return elapsedTime;
    },
    setElapsedTime: function(curTestId, time) {
      elapsedTime[curTestId] = time;
    },
    incScore: function() {
      score++;
    }
  };
});

iconControllers.controller('iconTestCtrl',
  ['$scope', '$http', '$routeParams', 'numTestPerSection', 'numTestPerShape', 'numTestPerDistance', 'timeData',
  function iconTestCtrl($scope, $http, $routeParams, numTestPerSection, numTestPerShape, numTestPerDistance, timeData) {
    $scope.randomSort = function() {
      return Math.random();
    };

    $scope.curTestStr = 'Test not found';
    $scope.testId = parseInt($routeParams.testId) - 1;
    $scope.testIdbySection = Math.floor(parseInt($scope.testId) % numTestPerSection);
    $scope.testCountbySection = $scope.testIdbySection + 1;
    $scope.testIdbyShape = Math.floor(parseInt($scope.testId) / numTestPerSection) % numTestPerDistance;
    $scope.testIdbyDistance = Math.floor(parseInt($scope.testId) / (numTestPerSection * numTestPerShape));

    // GetIcon
    if ($scope.testIdbyShape === 0) {
      $scope.testKey = 'C' + $scope.testIdbyDistance;
    }
    else if ($scope.testIdbyShape === 1) {
      $scope.testKey = 'S' + $scope.testIdbyDistance;
    }
    else if ($scope.testIdbyShape === 2) {
      $scope.testKey = 'F' + $scope.testIdbyDistance;
    }

    $scope.iconsRes = {};
    $http.get('resources/icon.json').success(function(response){
      $scope.iconsRes = response;

      $scope.icons = $scope.iconsRes[$scope.testKey].img;
      $scope.xdim = $scope.iconsRes[$scope.testKey].xdim;
      $scope.ydim = $scope.iconsRes[$scope.testKey].ydim;
      $scope.curTestStr = $scope.iconsRes[$scope.testKey].shape + ' Icon Test';

      $scope.answer = $scope.icons[Math.floor(Math.random() * $scope.icons.length)];
    });

    // Get Elapsed Time
    $scope.doStartTime = function() {
      $scope.timeStart = new Date().getTime();
    };

    $scope.doEndTime = function() {
      $scope.timeEnd = new Date().getTime();
      timeData.setElapsedTime($scope.testId, $scope.timeEnd - $scope.timeStart);
    };
  }
]);

iconControllers.controller('iconStatCtrl', ['$scope', 'timeData',
  function iconStatCtrl($scope) {
    $scope.avg = 0;
  }
]);

iconControllers.controller('iconLoadCtrl', ['$scope',
  function iconLoadCtrl() {
    return 0;
  }
]);
