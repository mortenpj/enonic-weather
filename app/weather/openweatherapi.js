'use strict';

angular.module('openWeatherApiModule', [])

.factory('openWeatherApiFactory', ['$rootScope', '$http', function($rootScope, $http) {


    var service = {
        baseUrl: "https://api.openweathermap.org/data/2.5/",
        appId: "8690db496c1d889b69c90a193971b6f6",
        cityId: {
            Oslo: 3143244,
            London: 2643743,
            Minsk: 625144
        },
        lastWeather: {
            Oslo: null,
            London: null,
            Minsk: null
        }
    };

    service.getOsloWeather = function(){
        $http({
          method: 'GET',
          url: service.baseUrl + 'weather?id=' + service.cityId.Oslo + "&appid=" + service.appId
        })
        .then(function successCallback(response) {
            service.lastWeather.Oslo = service.transformToWeatherObject(response.data);
            $rootScope.$broadcast("OSLO_WEATHER_UPDATED");
        }, function errorCallback(response) {
            $rootScope.$broadcast("OSLO_WEATHER_FAILED");
        });
    }

    service.getLondonWeather = function(){
        $http({
          method: 'GET',
          url: service.baseUrl + 'weather?id=' + service.cityId.London + "&appid=" + service.appId
        })
        .then(function successCallback(response) {
            service.lastWeather.London = service.transformToWeatherObject(response.data);
            $rootScope.$broadcast("LONDON_WEATHER_UPDATED");
        }, function errorCallback(response) {
            $rootScope.$broadcast("LONDON_WEATHER_FAILED");
        });
    }

    service.getMinskWeather = function(){
        $http({
          method: 'GET',
          url: service.baseUrl + 'weather?id=' + service.cityId.Minsk + "&appid=" + service.appId
        }).then(function successCallback(response) {
            service.lastWeather.Minsk = service.transformToWeatherObject(response.data);
            $rootScope.$broadcast("MINSK_WEATHER_UPDATED");
          }, function errorCallback(response) {
            $rootScope.$broadcast("MINSK_WEATHER_FAILED");
          });
    }

    service.transformToWeatherObject = function(openWeatherapiObject){
        var weatherObject = {
                temperature: service.kelvinTocelsius(openWeatherapiObject.main.temp),
                pressure: openWeatherapiObject.main.preassure,
                humidity: openWeatherapiObject.main.humidity,
                weatherDescription: service.getWeatherDescription(openWeatherapiObject.weather)
        };

        return weatherObject;
    }

    service.kelvinTocelsius = function(kelvin){
        return kelvin - 273.15;
    }

    service.getWeatherDescription = function(weatherArray){
        var description = "";
        if(weatherArray.length > 0){
            for(var i = 0; i < weatherArray.length; i++){
                description += weatherArray[i].description + ', ';
            }
        }
        if(description.length > 0){
            description = description.slice(0, description.length -2);
        }
        return description;
    }

    return service;


}]);
