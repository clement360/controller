angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, BT) {
    $scope.devices = BT.devices;
    $scope.stale = true;
    $scope.spinner = false;

    var success = function () {
        if ($scope.devices.length < 1) {
            // a better solution would be to update a status message rather than an alert
            alert("Didn't find any Bluetooth Low Energy devices.");
        }
    };

    var failure = function (error) {
        alert(error);
    };

    // pull to refresh
    $scope.onRefresh = function () {
       $scope.stale = false;
       BT.scan(function () { $scope.$broadcast('scroll.refreshComplete'); });
    }

    $scope.btScan = function () {
        $scope.spinner = true;
        BT.scan(function () {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.stale = false;
        })
    };
})

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
