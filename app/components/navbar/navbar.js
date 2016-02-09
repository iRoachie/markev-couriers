'use strict';

angular
  .module('markevCouriers')
  .directive('navbar', function () {
    return {
      restrict: 'E',
      templateUrl: '/app/components/navbar/navbar.html',
      controller: NavController,
      controllerAs: "vm"
    };

    function NavController(smoothScroll) {
      this.scroll = function scroll(id) {
        var element = document.getElementById(id);
        var options = {
          duration: 600,
          easing: 'easeInQuad',
          offset: 60
        };
        smoothScroll(element, options);
      }
    }
  });
