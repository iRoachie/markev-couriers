'use strict';

angular
  .module('markevCouriers')
  .directive('backImg', function () {
    return function (scope, element, attrs) {
      var url = attrs['backImg'];
      element.css({
        'background-image': 'url(' + url + ')',
        'background-size': 'cover',
        'background-position': 'right'
      });
    };
  });
