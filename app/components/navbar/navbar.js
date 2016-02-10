'use strict';

angular
  .module('markevCouriers')
  .component('navbar', {
    templateUrl: '/app/components/navbar/navbar.html',
    controller: function (smoothScroll, $state, $timeout) {
      var vm = this;

      vm.scroll = function scroll(id) {
        if ($state.current.name === 'home') {
          var element = document.getElementById(id);

          console.log(element);
          var options = {
            duration: 600,
            offset: 60
          };
          smoothScroll(element, options);
        } else {
          $state.go('home').then(function() {
            $timeout(function() {
              vm.scroll(id);
            }, 300)
          })
        }
      }
    },
    controllerAs: "vm"
  });

