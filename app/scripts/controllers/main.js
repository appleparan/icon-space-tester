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

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

iconControllers.controller('iconTestCtrl',
  ['$scope', '$http', '$routeParams', 'numTestPerSection', 'numTestPerShape', 'numTestPerDistance', 'timeData',
  function iconTestCtrl($scope, $http, $routeParams, numTestPerSection, numTestPerShape, numTestPerDistance, timeData) {
    $scope.randomSort = function() {
      return Math.random();
    };
    $scope.started = true;

    $scope.curTestStr = 'Test not found';
    $scope.testId = parseInt($routeParams.testId) - 1;
    $scope.testIdbySection = Math.floor(parseInt($scope.testId) % numTestPerSection);
    $scope.testCountbySection = $scope.testIdbySection + 1;
    $scope.testIdbyShape = Math.floor(parseInt($scope.testId) / numTestPerSection) % numTestPerDistance;
    $scope.testIdbyDistance = Math.floor(parseInt($scope.testId) / (numTestPerSection * numTestPerShape));

    // GetIcon
    if ($scope.testIdbyShape === 0) {
      $scope.testKey = 'C';
      $scope.curTestStr = 'Circle Icon Test';
    }
    else if ($scope.testIdbyShape === 1) {
      $scope.testKey = 'S';
      $scope.curTestStr = 'Square Icon Test';
    }
    else if ($scope.testIdbyShape === 2) {
      $scope.testKey = 'F';
      $scope.curTestStr = 'Free Form Icon Test';
    }

    if ($scope.testIdbyDistance === 0) {
      $scope.xdim = 3;
      $scope.ydim = 4;
    }
    else if($scope.testIdbyDistance === 1) {
      $scope.xdim = 4;
      $scope.ydim = 6;
    }
    else if($scope.testIdbyDistance === 2) {
      $scope.xdim = 7;
      $scope.ydim = 11;
    }

    $scope.iconsRes = {};
    $http.get('resources/icon.json').success(function(response){
      $scope.iconsRes = response;

      var orgIcons = $scope.iconsRes[$scope.testKey];
      $scope.icons = shuffle(orgIcons).slice(0, $scope.xdim * $scope.ydim);
      // $scope.icons = pickImage(orgIcons, $scope.xdim * $scope.ydim);
      $scope.answer = $scope.icons[Math.floor(Math.random() * $scope.icons.length)];
    });

    // Get Elapsed Time
    $scope.doStartTime = function() {
      $scope.timeStart = new Date().getTime();
      $scope.started = true;
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
