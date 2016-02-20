$(document).ready(function() {
  $(".menu-opener").click(function(){
    $(".menu-opener, .menu-opener-inner, .menu").toggleClass("active");
  });
});

// var pages = angular.module('pages', ['ui.router'])
var pages = angular.module('pages', ['ngAnimate','ui.bootstrap', 'ui.bootstrap.tpls', 'ui.router'])
.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);

pages.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url:'/home',
      templateUrl: 'page-templates/home.html'
    })

    .state('contents', {
      abstract: true,
      url:'/contents',
      templateUrl: 'page-templates/contents.html'
    })

    .state('contents.photos', {
      url:'/photos',
      templateUrl: 'page-templates/photos.html'
    })

    .state('contents.history', {
      url:'/history',
      templateUrl: 'page-templates/history.html'
    })

    .state('contents.other', {
      url:'/other',
      views: {
        '': { 
          templateUrl: 'page-templates/other.html'
        },
        'all@contents.other': {
          templateUrl: 'other-templates/all.html'
        },
        'book@contents.other': {
          templateUrl: 'other-templates/book.html'
        },
        'journal@contents.other': {
          templateUrl: 'other-templates/journal.html'
        },
        'news@contents.other': {
          templateUrl: 'other-templates/news.html'
        },
        'media@contents.other': {
          templateUrl: 'other-templates/media.html'
        },
        'online@contents.other': {
          templateUrl: 'other-templates/online.html'
        }
      }  
    })
});

pages.controller('Tabs', function ($scope, $window) {
});
