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
    $http.post(host + '/email', {info: info});
  }

  function contactUs(info) {
    $http.post(host + '/contact', {info:info});
  }
}
