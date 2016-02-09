'use strict';

angular
  .module('markevCouriers')
  .component('navbar', {
    templateUrl: '/app/components/navbar/navbar.html',
    controller: function (smoothScroll, $state) {
      this.homeClick = function() {
        if($state.current.name === 'home') {
          this.scroll('top');
        } else {
          $state.go('home')
        }
      };

      this.scroll = function scroll(id) {
        var element = document.getElementById(id);
        var options = {
          duration: 600,
          easing: 'easeInQuad',
          offset: 60
        };
        smoothScroll(element, options);
      }
    },
    controllerAs: "vm"
  });

