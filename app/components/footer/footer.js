'use strict';

angular
  .module('markevCouriers')
  .directive('footer', function () {
    return {
      restrict: 'E',
      templateUrl: '/app/components/footer/footer.html'
    }
  });
