'use strict';

angular
  .module('markevCouriers')
  .component('contact', {
    templateUrl: 'serve/contact.html',
    controller: function (EmailService) {
      var vm = this;
      this.info = {};

      this.submit = function () {
        EmailService.contactUs(this.info)
          .then(function () {
            vm.submitText = 'SENT';
          })
      };
    }
  });
