'use strict';

angular.module('weatherModule', ["openWeatherApiModule"])
.controller('weatherController', ['$scope', '$rootScope', 'openWeatherApiFactory', function($scope, $rootScope, openWeatherApiFactory) {

    $scope.lastweather = {
        oslo: {lastUpdated: null, weather: null},
        london: {lastUpdated: null, weather: null},
        minsk: {lastUpdated: null, weather: null}
    }

    $rootScope.$on("OSLO_WEATHER_UPDATED", function(){
        $scope.lastweather.oslo.weather = openWeatherApiFactory.lastWeather.Oslo;
    })

    $rootScope.$on("LONDON_WEATHER_UPDATED", function(){
        $scope.lastweather.london.weather = openWeatherApiFactory.lastWeather.London;
    })

    $rootScope.$on("MINSK_WEATHER_UPDATED", function(){
        $scope.lastweather.minsk.weather = openWeatherApiFactory.lastWeather.Minsk;
    })

    $scope.init = function() {
        $scope.lastweather.oslo.weather = openWeatherApiFactory.lastWeather.Oslo;
        $scope.lastweather.london.weather = openWeatherApiFactory.lastWeather.London;
        $scope.lastweather.minsk.weather = openWeatherApiFactory.lastWeather.Minsk;
    }

    $scope.init();
}]);