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

    console.log("Henter oslo vær");
        $http({
          method: 'GET',
          url: service.baseUrl + 'weather?id=' + service.cityId.Oslo + "&appid=" + service.appId
        }).then(function successCallback(response) {
            service.lastWeather.Oslo = response.data;
            $rootScope.$broadcast("OSLO_WEATHER_UPDATED");
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    }

    return service;


}]);
