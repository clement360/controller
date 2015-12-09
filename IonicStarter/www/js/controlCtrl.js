angular.module('control', [])

.controller('DashCtrl', function ($scope, BT) {
    $scope.devices = BT.devices;
    $scope.stale = true;
    $scope.spinner = false;
    $scope.pressed = false;

    var updateControl = function (index, value) {
        return this.substr(0, index) + value + this.substr(index + value.length);
    };

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

    $scope.down = function () {
        $scope.pressed = true;
    }

    $scope.up = function () {
        $scope.pressed = false;
    }

    $scope.btWrite = function (value) {
        BT.write(value);
    };
})