'use strict';

angular.module('scifiApp')
    .controller('loginFirebase', function($rootScope, $scope, $firebase, $state) {
        var ref = new Firebase('https://scificlub.firebaseio.com');

        var checkIfAdmin = function(uid) {
            ref.child('admins').child(uid).once('value', function(snap) {
                if (snap.key() === uid) {
                    $scope.authenticated = true;
                    $scope.$apply();
                } else {
                    $state.go('home');
                }


            });
        };

        var loginToGoogle = function() {
            ref.authWithOAuthPopup('google', function(error, authData) {
                if (error) {} else {
                    checkIfAdmin(authData.auth.uid);
                }
            });
        };

        $scope.login = function() {
            loginToGoogle();
        };
    })
    .controller('bookFirebase', function($scope, $firebase, $firebaseArray) {
        var ref = new Firebase('https://scificlub.firebaseio.com/books');

        $scope.addBookToFirebase = function() {
            ref.child($scope.newBook.title).update($scope.newBook);
        };

        $scope.booksInDatabase = $firebaseArray(new Firebase('https://scificlub.firebaseio.com/books'));
    })
    .controller('editBook', function($scope, $stateParams,$firebaseObject) {
        var id = $stateParams.id;
        var ref = $firebaseObject(new Firebase('https://scificlub.firebaseio.com/books/' + id));
        ref.$bindTo($scope, 'editBook')
    });