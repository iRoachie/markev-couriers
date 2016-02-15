'use strict';

angular
  .module('markevCouriers')
  .component('open', {
    templateUrl: 'app/components/openAccount/openAccount.html',
    controller: function() {
      this.info = {};
      this.submitText = 'SUBMIT';

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
      }
    }
  });
