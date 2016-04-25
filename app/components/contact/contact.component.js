'use strict';

angular
  .module('markevCouriers')
  .component('contact', {
    templateUrl: 'serve/contact.html',
    controller: function(EmailService) {
      this.info = {};

      this.submit = function() {
        this.submitText = 'SENT';
        EmailService.contactUs(this.info);
      };
    }
  });
