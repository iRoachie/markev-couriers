'use strict';

angular
  .module('markevCouriers')
  .config(function ($urlRouterProvider, $locationProvider, $stateProvider, $uiViewScrollProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<home></home>',
        onEnter: function(Page) {
          Page.setTitle('Markev Couriers - It\'s Delivered');
        }
      })
      .state('about', {
        url: '/about',
        template: '<about></about>',
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
