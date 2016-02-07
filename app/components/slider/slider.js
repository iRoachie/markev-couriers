'use strict';

angular
  .module('markevCouriers')
  .directive('slider', function () {
    return {
      restrict: 'E',
      templateUrl: '/app/components/slider/slider.html'
    }
  });
