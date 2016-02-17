'use strict';

angular
  .module('markevCouriers')
  .component('navbar', {
    templateUrl: 'dist/navbar.html',
    controller: function (smoothScroll, $state, $timeout) {
      this.scroll = scroll;

      function scroll(id) {
        if ($state.current.name === 'home') {
          var element = document.getElementById(id);
          var options = {
            duration: 600,
            offset: 60
          };
          smoothScroll(element, options);
        } else {
          $state.go('home').then(function () {
            $timeout(function () {
              scroll(id);
            }, 300)
          })
        }
      }
    }
  });

