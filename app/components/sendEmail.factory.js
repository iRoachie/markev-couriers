'use strict';

angular
  .module('markevCouriers')
  .factory('EmailService', function ($http, $location, $q) {
    return {
      contactUs: function (info) {
        var deferred = $q.defer();

        $http.post('https://formspree.io/markevinc@live.com', info)
          .then(function (data) {
            deferred.resolve(data);
          }, function (error) {
            deferred.reject(error);
          });

          return deferred.promise;
      }
    };
  });
