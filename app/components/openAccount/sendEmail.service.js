'use strict';

angular
  .module('markevCouriers')
  .service('EmailService', EmailService);

function EmailService($http, $location) {
  var service = this;
  var host = $location.$$host !== 'localhost' ? 'https://markev-couriers.herokuapp.com' : 'http://localhost:5000';

  service.sendEmail = sendEmail;
  service.contactUs = contactUs;

  function sendEmail(info) {
    $http.post(host + '/api/open-account', info);
  }

  function contactUs(info) {
    $http.post(host + '/api/contact', info);
  }
}
