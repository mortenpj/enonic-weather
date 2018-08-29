'use strict';

angular.module('weatherModule', ["openWeatherApiModule"])
.controller('weatherController', ['$scope', '$rootScope', 'openWeatherApiFactory', function($scope, $rootScope, openWeatherApiFactory) {

    $scope.lastweather = {
        oslo: {lastUpdated: null, weather: null},
        london: {lastUpdated: null, weather: null},
        minsk: {lastUpdated: null, weather: null}
    }

    $scope.errors = {
        oslo: { message: "Failed to update weather for Oslo", showmessage: false},
        london: { message: "Failed to update weather for London", showmessage: false},
        minsk: { message: "Failed to update weather for Minsk", showmessage: false}
    }

    $rootScope.$on("OSLO_WEATHER_UPDATED", function(){
        $scope.errors.oslo.showmessage = false;
        $scope.lastweather.oslo.weather = openWeatherApiFactory.lastWeather.Oslo.weather;
        $scope.lastweather.oslo.lastUpdated = openWeatherApiFactory.lastWeather.Oslo.updated;
    })

    $rootScope.$on("OSLO_WEATHER_FAILED", function(){
        $scope.errors.oslo.showmessage = true;
    })

    $rootScope.$on("LONDON_WEATHER_UPDATED", function(){
        $scope.errors.london.showmessage = false;
        $scope.lastweather.london.weather = openWeatherApiFactory.lastWeather.London.weather;
        $scope.lastweather.london.lastUpdated = openWeatherApiFactory.lastWeather.London.updated;
    })

    $rootScope.$on("LONDON_WEATHER_FAILED", function(){
        $scope.errors.london.showmessage = true;
    })

    $rootScope.$on("MINSK_WEATHER_UPDATED", function(){
        $scope.errors.minsk.showmessage = false;
        $scope.lastweather.minsk.weather = openWeatherApiFactory.lastWeather.Minsk.weather;
        $scope.lastweather.minsk.lastUpdated = openWeatherApiFactory.lastWeather.Minsk.updated;
    })

    $rootScope.$on("MINSK_WEATHER_FAILED", function(){
        $scope.errors.minsk.showmessage = true;
    })

    $scope.refreshOslo = function(){
        openWeatherApiFactory.getOsloWeather();
    }

    $scope.refreshLondon = function(){
        openWeatherApiFactory.getLondonWeather();
    }

    $scope.refreshMinsk = function() {
        openWeatherApiFactory.getMinskWeather();
    }


    $scope.init = function() {
        $scope.lastweather.oslo.weather = openWeatherApiFactory.lastWeather.Oslo;
        $scope.lastweather.london.weather = openWeatherApiFactory.lastWeather.London;
        $scope.lastweather.minsk.weather = openWeatherApiFactory.lastWeather.Minsk;
    }

    $scope.init();
}]);