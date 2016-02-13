'use strict';

angular
  .module('markevCouriers')
  .config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<home></home>'
      })
      .state('about', {
        url: '/about',
        template: '<about></about>'
      })
    ;

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });