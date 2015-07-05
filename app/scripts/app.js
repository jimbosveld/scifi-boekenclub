'use strict';

angular
  .module('scifiApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'firebase',
    'ui.bootstrap'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        //
        $locationProvider.html5Mode(false);
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "partials/home.html",
                controller: 'featureController'
            })
            .state('book', {
                url: "/boeken/:id",
                templateUrl: "partials/boeken.html",
                controller: 'bespreekController'
            })
            .state('review', {
                url: "/boeken/:id/review/:user",
                templateUrl: "partials/review.html",
                controller: 'reviewController'
            })
            .state('admin', {
                url: "/admin",
                templateUrl: "partials/admin.html",
                controller: 'loginFirebase'
            })
            .state('admin.add_book', {
                url: "/add_book",
                templateUrl: "partials/admin.add_book.html",
                controller: 'bookFirebase'
            })
            .state('admin.edit_book', {
                url: "/edit_book/:id",
                templateUrl: "partials/admin.edit_book.html",
                controller: 'editBook'
            })
    });