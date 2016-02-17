'use strict';

angular
  .module('markevCouriers')
  .controller('MainController', MainController);

function MainController(Page) {
  this.Page = Page;
}
