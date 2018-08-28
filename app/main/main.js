'use strict';

angular.module('mainModule', ['openWeatherApiModule'])
.factory('mainFactory', ['$rootScope', '$timeout', 'openWeatherApiFactory', function($rootScope, $timeout, openWeatherApiFactory){

    var service = {
        pollerStarted: false
    }

    service.startPoller = function(){
        if(!service.pollerStarted){
            service.pollerStarted = true;
            service.poller();
        }
    }

    service.poller = function(){
        $timeout(function(){
            service.updateWeather();
            service.poller();
        }, 60000);
    }

    service.updateWeather = function(){
        openWeatherApiFactory.getOsloWeather();
    }

    return service;
}])
.controller('mainController', ['$scope', 'openWeatherApiFactory', 'mainFactory', function($scope, openWeatherApiFactory, mainFactory) {

    $scope.init = function() {
        mainFactory.updateWeather();
        mainFactory.startPoller();
    }
    $scope.init();

}]);


