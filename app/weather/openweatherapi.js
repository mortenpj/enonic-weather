'use strict';

angular.module('openWeatherApiModule', [])

.factory('openWeatherApiFactory', ['$rootScope', '$http', function($rootScope, $http) {


    var service = {
        baseUrl: "https://api.openweathermap.org/data/2.5/",
        weathericonBaseUrl: "http://openweathermap.org/img/w/",
        appId: "8690db496c1d889b69c90a193971b6f6",
        cityId: {
            Oslo: 3143244,
            London: 2643743,
            Minsk: 625144
        },
        lastWeather: {
            Oslo: {weather: null, updated: null},
            London: {weather: null, updated: null},
            Minsk: {weather: null, updated: null}
        }
    };

    service.getOsloWeather = function(){
        $http({
          method: 'GET',
          url: service.baseUrl + 'weather?id=' + service.cityId.Oslo + "&appid=" + service.appId
        })
        .then(function successCallback(response) {
            service.lastWeather.Oslo.weather = service.transformToWeatherObject(response.data);
            service.lastWeather.Oslo.updated = moment().format("HH:mm:ss");
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
            service.lastWeather.London.weather = service.transformToWeatherObject(response.data);
            service.lastWeather.London.updated = moment().format("HH:mm:ss");
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
            service.lastWeather.Minsk.weather = service.transformToWeatherObject(response.data);
            service.lastWeather.Minsk.updated = moment().format("HH:mm:ss");
            $rootScope.$broadcast("MINSK_WEATHER_UPDATED");
          }, function errorCallback(response) {
            $rootScope.$broadcast("MINSK_WEATHER_FAILED");
          });
    }

    service.transformToWeatherObject = function(openWeatherapiObject){
        var weatherObject = {
                weathericonurl: service.getWeatherIconUrl(openWeatherapiObject.weather),
                temperature: service.getTemperature(openWeatherapiObject.main.temp),
                pressure: openWeatherapiObject.main.pressure,
                humidity: openWeatherapiObject.main.humidity,
                weatherDescription: service.getWeatherDescription(openWeatherapiObject.weather),
                windspeed: openWeatherapiObject.wind.speed,
                winddirection: openWeatherapiObject.wind.deg,
        };

        return weatherObject;
    }

    service.getWeatherIconUrl = function(weatherArray){

        var url = service.weathericonBaseUrl;
        if(weatherArray && weatherArray.length > 0){
            url += weatherArray[0].icon + ".png";
        }
        return url;
    }

    service.getTemperature = function(kelvin){
        var celsius = kelvin - 273.15;
        var celsiusRounded = celsius.toFixed(0)
        return celsiusRounded;
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
