angular.module('markevCouriers', [
    'ui.router',
    'slick',
    'smoothScroll'
  ])

  .directive('backImg', function () {
    return function (scope, element, attrs) {
      var url = attrs['backImg'];
      element.css({
        'background-image': 'url(' + url + ')',
        'background-size': 'cover'
      });
    };
  })

  .config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/home.html'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
