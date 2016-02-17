'use strict';

angular
  .module('markevCouriers')
  .component('open', {
    templateUrl: 'dist/openAccount.html',
    controller: function(EmailService) {
      this.info = {
        parish: 'Christ Church'
      };

      this.parishes =
        [
          'Christ Church',
          'St. Andrew',
          'St. George',
          'St. James',
          'St. John',
          'St. Joseph',
          'St. Lucy',
          'St. Michael',
          'St. Peter',
          'St. Philip',
          'St. Thomas'
        ];

      this.hearAbout = [
        'Referral',
        'Web Search',
        'Newspaper Ad',
        'Yellow Pages'
      ];

      this.submit = function() {
        this.submitText = 'SENT';
        EmailService.sendEmail(this.info);
      };
    }
  });
