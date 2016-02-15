'use strict';

angular
  .module('markevCouriers')
  .service('EmailService', EmailService);

function EmailService($http, $location) {
  var service = this;

  service.sendEmail = sendEmail;

  function sendEmail(info) {
    var host = 'http://localhost:5000';

    if($location.$$host !== 'localhost') {
      host = 'https://markev-couriers.herokuapp.com';
    }
    $http.post(host + '/email', {info: info});
  }
}
