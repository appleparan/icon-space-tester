"use strict";function shuffle(a){for(var b,c,d=a.length;d;b=Math.floor(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);return a}angular.module("iconSpaceTesterApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngTouch","ui.bootstrap","iconControllers","iconServices"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"iconLoadCtrl"}).when("/test/:testId",{templateUrl:"views/test.html",controller:"iconTestCtrl"}).when("/end",{templateUrl:"views/thanks.html"}).when("/stat",{templateUrl:"views/stat.html",controller:"statCtrl"}).otherwise({redirectTo:"/"})}]);var iconServices=angular.module("iconServices",["ngResource"]),iconControllers=angular.module("iconControllers",["ngRoute","ngTouch"]);iconServices.constant("numTestPerSection",8),iconServices.constant("numTestPerShape",3),iconServices.constant("numTestPerDistance",3),iconServices.factory("timeData",function(){var a={},b=0;return{getElapsedTime:function(){return a},setElapsedTime:function(b,c){a[b]=c},incScore:function(){b++}}}),iconControllers.controller("iconTestCtrl",["$scope","$http","$routeParams","numTestPerSection","numTestPerShape","numTestPerDistance","timeData",function(a,b,c,d,e,f,g){a.randomSort=function(){return Math.random()},a.startTest=!0,a.curTestStr="Test not found",a.testId=parseInt(c.testId)-1,a.testCount=parseInt(c.testId),a.testIdbySection=Math.floor(parseInt(a.testId)%d),a.testCountbySection=a.testIdbySection+1,a.testIdbyShape=Math.floor(parseInt(a.testId)/d)%f,a.testIdbyDistance=Math.floor(parseInt(a.testId)/(d*e)),0===a.testIdbyShape?(a.testKey="C",a.curTestStr="Circle Icon Test"):1===a.testIdbyShape?(a.testKey="S",a.curTestStr="Square Icon Test"):2===a.testIdbyShape&&(a.testKey="F",a.curTestStr="Free Form Icon Test"),0===a.testIdbyDistance?(a.xdim=3,a.ydim=4):1===a.testIdbyDistance?(a.xdim=4,a.ydim=6):2===a.testIdbyDistance&&(a.xdim=7,a.ydim=11),a.iconsRes={},b.get("resources/icon.json").success(function(b){a.iconsRes=b;var c=a.iconsRes[a.testKey];a.icons=shuffle(c).slice(0,a.xdim*a.ydim),a.answer=a.icons[Math.floor(Math.random()*a.icons.length)]}),a.doStartTime=function(){a.timeStart=(new Date).getTime(),a.startTest=!0},a.doEndTime=function(){a.timeEnd=(new Date).getTime(),g.setElapsedTime(a.testId,a.timeEnd-a.timeStart)}}]),iconControllers.controller("iconStatCtrl",["$scope","timeData",function(a){a.avg=0}]),iconControllers.controller("iconLoadCtrl",["$scope",function(){return 0}]);