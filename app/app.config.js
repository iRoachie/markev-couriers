'use strict';

angular
  .module('markevCouriers')
  .config(function ($urlRouterProvider, $locationProvider, $stateProvider, $uiViewScrollProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'serve/home.html',
        onEnter: function(Page) {
          Page.setTitle('Markev Couriers - It\'s Delivered');
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'serve/about.html',
        onEnter: function(Page) {
          Page.setTitle('About - Markev Couriers');
        }
      })
      .state('contact', {
        url: '/contact-us',
        template: '<contact></contact>',
        onEnter: function(Page) {
          Page.setTitle('Contact Us - Markev Couriers');
        }
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $uiViewScrollProvider.useAnchorScroll();
  });
