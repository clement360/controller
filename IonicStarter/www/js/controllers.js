angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SensorsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MusicCtrl', function ($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
