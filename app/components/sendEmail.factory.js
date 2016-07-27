'use strict';

angular
  .module('markevCouriers')
  .factory('EmailService', function($http, $location) {
    var host = $location.$$host !== 'localhost' ? 'http://www.markevcouriers.com' : 'http://localhost:5000';

    return {
      sendEmail: function(info) {
        $http.post(host + '/api/open-account', info);
      },
      contactUs: function(info) {
        $http.post(host + '/api/contact', info);
      }
    };
  });
