angular.module('control', [])

.controller('DashCtrl', function ($scope, BT) {
    $scope.devices = BT.devices;
    $scope.stale = true;
    $scope.spinner = false;
    $scope.forward = 0;
    $scope.back = 0;
    $scope.left = 0;
    $scope.right = 0;

    var lastSent = 9;


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

    $scope.btScan = function () {
        $scope.spinner = true;
        BT.scan(function () {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.stale = false;
        })
    };

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

    $scope.btConnect = function (deviceId) {
        $scope.spinner = true;
        BT.connect(
            deviceId,
            function (val) { 
                console.log("con val = " + val); 
                $scope.connected = val; 
                $scope.spinner = !val;
                if (val == true) { window.setInterval(sendStatus, 100); }
                if (!$scope.$$phase) { $scope.$apply() }
            }
        );
    };
    $scope.btDisconnect = function (deviceId) {
        $scope.spinner = true;
        BT.disconnect(function (val) { console.log("disc val = " + val); $scope.connected = val; $scope.spinner = val; if (!val) { $scope.$apply() } });
    };
    $scope.btWrite = function (value) {
        //Disabled for now
        // BT.write(value);
    };
})