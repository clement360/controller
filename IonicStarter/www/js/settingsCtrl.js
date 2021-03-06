﻿angular.module('settings', [])

.controller('SettingsCtrl', function ($scope, BT) {
    $scope.spinner = false;

    $scope.btConnect = function (deviceId) {
        $scope.spinner = true;
        BT.connect(
            deviceId,
            function (val) {
                console.log("con val = " + val);
                $scope.connected = val;
                $scope.spinner = !val;
                if (!$scope.$$phase) { $scope.$apply() }
            }
        );
    };
    $scope.btDisconnect = function (deviceId) {
        $scope.spinner = true;
        BT.disconnect(function (val) { console.log("disc val = " + val); $scope.connected = val; $scope.spinner = val; if (!val) { $scope.$apply() } });
    };

    $scope.btWrite = function (value) {
        BT.write(value);
    };
})