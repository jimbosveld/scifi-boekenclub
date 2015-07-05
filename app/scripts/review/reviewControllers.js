'use strict';

angular.module('scifiApp')
    .controller('reviewController', function($scope, $firebaseArray, $stateParams, $firebaseAuth, $firebaseObject) {
        var ref = new Firebase('https://scificlub.firebaseio.com')
        $scope.authObj = $firebaseAuth(ref);
        $scope.user = $scope.authObj.$getAuth();
        $scope.book = $stateParams.id;

        var userRef = $firebaseObject(new Firebase('https://scificlub.firebaseio.com/users/' + $scope.user.uid + '/' + $scope.book + '/reviews/'));
        var reviewRef = $firebaseObject(new Firebase('https://scificlub.firebaseio.com/reviews/' + $scope.book + '/' + $scope.user.uid));
        
        userRef.$bindTo($scope, "review").then(function() {            
            $scope.review.name = $scope.user.google.displayName
        })

        reviewRef.$bindTo($scope, "review")


        userRef.$loaded(function() {
            console.log("data changed!");
            userRef.$watch(function() {
               $('#saved').removeClass('hidden');
            });
        });

    });