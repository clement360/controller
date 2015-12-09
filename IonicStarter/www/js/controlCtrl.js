angular.module('control', [])

.controller('DashCtrl', function ($scope, BT) {
    $scope.devices = BT.devices;
    $scope.stale = true;
    $scope.spinner = false;
    $scope.forward = 0;
    $scope.back = 0;
    $scope.left = 0;
    $scope.right = 0;

    var lastSent = 0;

    var success = function () {
        if ($scope.devices.length < 1) {
            // a better solution would be to update a status message rather than an alert
            alert("Didn't find any Bluetooth Low Energy devices.");
        }
    };

    var failure = function (error) {
        alert(error);
    };

    $scope.down = function (val) {
        switch(val) {
            case 1:
                $scope.forward = 1;
                break;
            case 2:
                $scope.back = 1;
                break;
            case 3:
                $scope.left = 1;
                break;
            case 4:
                $scope.right = 1;
                break;
        };
        sendStatus();
    }

    $scope.up = function (val) {
        switch (val) {
            case 1:
                $scope.forward = 0;
                break;
            case 2:
                $scope.back = 0;
                break;
            case 3:
                $scope.left = 0;
                break;
            case 4:
                $scope.right = 0;
                break;
        };
    }

    var sendStatus = function () {
        var forw = $scope.forward;
        var back = $scope.back;
        var left = $scope.left;
        var righ = $scope.right;

        var sendVal = '0';
        
        if (forw) { sendVal = '1'; }
        else if (back) { sendVal = '2'; }
        else if (righ) { sendVal = '4'; }
        else if (left) { sendVal = '3'; }
        else if (sendVal == '0' && lastSent == '1') { sendVal = '5'; }
        else if (sendVal == '0' && lastSent == '2') { sendVal = '6'; };

        if (sendVal != '0') {
            lastSent = sendVal;
            console.log('Value Sent:' + sendVal);
            BT.write(sendVal);
        }
    };

    var init = function () {
        setInterval(sendStatus, 100);
    };
    init();


})