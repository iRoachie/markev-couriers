'use strict';

angular
  .module('markevCouriers')
  .config(function ($urlRouterProvider, $locationProvider, $stateProvider, $uiViewScrollProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<home></home>'
      })
      .state('about', {
        url: '/about',
        template: '<about></about>'
      })
      .state('open-account', {
        url: '/open-an-account',
        template: '<open></open>'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $uiViewScrollProvider.useAnchorScroll();
  });
