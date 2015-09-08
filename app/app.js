angular.module('markevCouriers', [
  'ui.router'
])

.config(function($urlRouterProvider, $locationProvider, $stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html'
    });

    $urlRouterProvider.otherwise('/');
})
