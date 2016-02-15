'use strict';

angular
  .module('markevCouriers')
  .service('EmailService', EmailService);

function EmailService($http) {
  var service = this;

  service.sendEmail = sendEmail;

  function sendEmail(info) {
    $http.post('http://localhost:80/email', {info: info});
  }
}
