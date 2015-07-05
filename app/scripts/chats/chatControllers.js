'use strict';

angular.module('scifiApp')
    .controller('logging', function($scope, $firebase, $firebaseAuth) {
        var ref = new Firebase('https://scificlub.firebaseio.com/');
        $scope.auth = $firebaseAuth(ref);

        $scope.auth.$onAuth(function(authData) {
            if (authData) {
                $scope.authData = authData;
            } else {
                $scope.authData = null;
            }
        });

        $scope.logUserIn = function() {
            $scope.auth.$authWithOAuthPopup("google").then(function(authData) {}).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        };

        $scope.logOut = function() {
            $scope.auth.$unauth();
        };
    })
    .controller('chatFirebase', function($firebaseArray, $scope, $stateParams) {

        var matchUrl = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?");



        $scope.bookRef = $stateParams.id;
        var ref = new Firebase('https://scificlub.firebaseio.com/chats/' + $scope.bookRef);
        var userRef = new Firebase('https://scificlub.firebaseio.com/users/');
        $scope.chatsInDatabase = $firebaseArray(new Firebase('https://scificlub.firebaseio.com/chats/' + $scope.bookRef));

        $scope.getChatsPreview = function(book) {
            $scope.chatsPreview = $firebaseArray(new Firebase('https://scificlub.firebaseio.com/chats/' + book));
        };

        // Get all links from chats

        $scope.chaturls = [];

        ref.once('value', function(allChats) {
            allChats.forEach(function(chatSnap) {
                var chat = chatSnap.val().body;

                if (chat.match(matchUrl)) {
                    // console.log(chat.match(matchUrl)[0])
                    $scope.chaturls.push(chat.match(matchUrl)[0]);
                }
            });
        });

        $scope.submitChat = function(body) {
            if ($scope.body.match(matchUrl)) {
                $scope.chaturls.push($scope.body);
            }

            $scope.userInDatabase = $firebaseArray(new Firebase('https://scificlub.firebaseio.com/users/' + $scope.authData.uid + '/' + $stateParams.id + '/chats/'));
            var date = new Date();

            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var formattedTime = hours + ':' + minutes + ':' + seconds;

            $scope.chatsInDatabase.$add({
                body: $scope.body,
                user: $scope.authData,
                dateAdded: formattedTime
            });

            $scope.userInDatabase.$add({
                body: $scope.body,
                book: $stateParams.id,
                dateAdded: formattedTime
            });
        };
    });