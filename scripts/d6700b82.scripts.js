"use strict";angular.module("iconSpaceTesterApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngTouch","akoenig.deckgrid","iconControllers","iconServices"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"iconLoadCtrl"}).when("/test/:testId",{templateUrl:"views/test.html",controller:"iconTestCtrl"}).when("/stat",{templateUrl:"views/stat.html",controller:"statCtrl"}).otherwise({redirectTo:"/"})}]);var iconServices=angular.module("iconServices",["ngResource"]),iconControllers=angular.module("iconControllers",["ngRoute","ngTouch"]);iconServices.constant("numTestPerSection",8),iconServices.constant("numTestPerShape",3),iconServices.constant("numTestPerDistance",3),iconServices.factory("timeData",function(){var a={},b=0;return{getElapsedTime:function(){return a},setElapsedTime:function(b,c){a[b]=c},incScore:function(){b++}}}),iconControllers.controller("iconTestCtrl",["$scope","$http","$routeParams","numTestPerSection","numTestPerShape","numTestPerDistance","timeData",function(a,b,c,d,e,f,g){a.randomSort=function(){return Math.random()},a.curTestStr="Test not found",a.testId=parseInt(c.testId)-1,a.testIdbySection=Math.floor(parseInt(a.testId)%d),a.testCountbySection=a.testIdbySection+1,a.testIdbyShape=Math.floor(parseInt(a.testId)/d)%f,a.testIdbyDistance=Math.floor(parseInt(a.testId)/(d*e)),0===a.testIdbyShape?a.testKey="C"+a.testIdbyDistance:1===a.testIdbyShape?a.testKey="S"+a.testIdbyDistance:2===a.testIdbyShape&&(a.testKey="F"+a.testIdbyDistance),a.iconsRes={},b.get("resources/icon.json").success(function(b){a.iconsRes=b,a.icons=a.iconsRes[a.testKey].img,a.xdim=a.iconsRes[a.testKey].xdim,a.ydim=a.iconsRes[a.testKey].ydim,a.curTestStr=a.iconsRes[a.testKey].shape+" Icon Test",a.answer=a.icons[Math.floor(Math.random()*a.icons.length)]}),a.doStartTime=function(){a.timeStart=(new Date).getTime()},a.doEndTime=function(){a.timeEnd=(new Date).getTime(),g.setElapsedTime(a.testId,a.timeEnd-a.timeStart)}}]),iconControllers.controller("iconStatCtrl",["$scope","timeData",function(a){a.avg=0}]),iconControllers.controller("iconLoadCtrl",["$scope",function(){return 0}]);