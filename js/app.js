$(document).ready(function() {
  $(".menu-opener").click(function(){
    $(".menu-opener, .menu-opener-inner, .menu").toggleClass("active");
  });
});

var pages = angular.module("pages", ["ui.router", "ui.bootstrap"]);

pages.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$on('$stateChangeSuccess', function() {
    window.scrollTo(0,0); 
  });
});

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

    .state('contents.history.about', {
      url:'/about',
      templateUrl: 'history-templates/about.html'
    })

    .state('contents.history.familytree', {
      url:'/familytree',
      templateUrl: 'history-templates/tree.html'
    })

    .state('contents.history.familytree2', {
      url:'/familytree2',
      templateUrl: 'history-templates/tree2.html'
    })

    .state('contents.other', {
      url:'/other',
      templateUrl: 'page-templates/other.html'
    })

    .state('contents.other.all', {
      url:'/all',
      templateUrl: 'other-templates/all.html'
    })

    .state('contents.other.book', {
      url:'/book',
      templateUrl: 'other-templates/book.html'
    })

    .state('contents.other.journal', {
      url:'/journal',
      templateUrl: 'other-templates/journal.html'
    })

    .state('contents.other.news', {
      url:'/news',
      templateUrl: 'other-templates/news.html'
    })

    .state('contents.other.media', {
      url:'/media',
      templateUrl: 'other-templates/media.html'
    })

    .state('contents.other.online', {
      url:'/online',
      templateUrl: 'other-templates/online.html'
    })
});

pages.controller("HistoryTabs", function($rootScope, $scope, $state) {
  $scope.go = function(route){
    $state.go(route);
  };

  $scope.active = function(route){
    return $state.is(route);
  };

  $scope.tabs = [
    { heading: "About", route:"contents.history.about", active:true },
    { heading: "Martha Lim Family Tree", route:"contents.history.familytree", active:false },
    { heading: "Antonio Kim Family Tree", route:"contents.history.familytree2", active:false }
  ];

  $scope.$on("$stateChangeSuccess", function() {
    $scope.tabs.forEach(function(tab) {
      tab.active = $scope.active(tab.route);
    });
  });
});

pages.controller("OtherTabs", function($rootScope, $scope, $state) {
  $scope.go = function(route){
    $state.go(route);
  };

  $scope.active = function(route){
    return $state.is(route);
  };

  $scope.tabs = [
    { heading: "All", route:"contents.other.all", active:true },
    { heading: "Books", route:"contents.other.book", active:false },
    { heading: "Journal Articles", route:"contents.other.journal", active:false },
    { heading: "News", route:"contents.other.news", active:false },
    { heading: "Multimedia", route:"contents.other.media", active:false },
    { heading: "Online Resources", route:"contents.other.online", active:false },
  ];

  $scope.$on("$stateChangeSuccess", function() {
    $scope.tabs.forEach(function(tab) {
      tab.active = $scope.active(tab.route);
    });
  });
});
