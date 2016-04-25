'use strict';

angular
  .module('markevCouriers')
  .config(function ($urlRouterProvider, $locationProvider, $stateProvider, $uiViewScrollProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'dist/home.html',
        onEnter: function(Page) {
          Page.setTitle('Markev Couriers - It\'s Delivered');
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'dist/about.html',
        onEnter: function(Page) {
          Page.setTitle('About - Markev Couriers');
        }
      })
      .state('open-account', {
        url: '/open-an-account',
        template: '<open></open>',
        onEnter: function(Page) {
          Page.setTitle('Open an Account - Markev Couriers');
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
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

    $uiViewScrollProvider.useAnchorScroll();
  });
