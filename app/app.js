angular.module('markevCouriers', [
  'ui.router',
  'slick'
])

.config(function($urlRouterProvider, $locationProvider, $stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html'
    });

    $urlRouterProvider.otherwise('/');
})
