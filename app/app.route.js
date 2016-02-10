'use strict';

angular
  .module('markevCouriers')
  .config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/home.html'
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
