'use strict';

angular.module('scifiApp')
    .controller('featureController', function($scope, $firebaseArray) {
        $scope.allBooks = $firebaseArray(new Firebase('https://scificlub.firebaseio.com/books'));
    })
    .controller('bespreekController', function($scope, $firebaseObject, $stateParams) {
        $scope.book = $firebaseObject(new Firebase('https://scificlub.firebaseio.com/books/' + $stateParams.id));
    })
    .controller('displayReviewController', function($scope, $firebaseArray, $stateParams) {
        $scope.book = $stateParams.id;
        $scope.allReviews = $firebaseArray(new Firebase('https://scificlub.firebaseio.com/reviews/' + $scope.book));
    });
