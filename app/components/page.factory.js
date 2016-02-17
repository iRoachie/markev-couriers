'use strict';

angular
  .module('markevCouriers')
  .factory('Page', function () {
    var title = 'Markev Couriers - It\'s Delivered';

    return {
      setTitle: function (newTitle) {
        title = newTitle;
      },
      title: function () {
        return title;
      }
    };
  });
