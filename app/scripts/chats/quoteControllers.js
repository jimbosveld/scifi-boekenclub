"use strict";

angular.module("scifiApp").controller("quoteFirebase", function($scope, $firebase, $firebaseArray, $firebaseAuth, $stateParams) {
    var ref = new Firebase("https://scificlub.firebaseio.com");
    $scope.book = $stateParams.id;
    $scope.authObj = $firebaseAuth(ref);
    $scope.authObj.$onAuth(function(authData) {
        if (authData) {
            $scope.user = authData;
            $scope.quoteRef = $firebaseArray(new Firebase("https://scificlub.firebaseio.com/users/" + $scope.user.uid + '/' + $scope.book + "/quotes/"));
            $scope.quoteBookRef = $firebaseArray(new Firebase("https://scificlub.firebaseio.com/quotes/" + $scope.book + '/'));
        } else {
            console.log("Logged out");
        }
    });

    var matchPage = new RegExp("([^\s]+)")

    $scope.submitQuote = function(quote) {
        $scope.quoteRef.$add(quote);
        $scope.quoteBookRef.$add(quote);
    };
});