'use strict';

angular
  .module('markevCouriers')
  .directive('navbar', function () {
    return {
      restrict: 'E',
      templateUrl: '/app/components/navbar/navbar.html'
    }
  });
