angular.module('sensor', ['chart.js'])

.controller('SensorsCtrl', function ($scope) {
    $scope.labels = ["0mn","5mn", "10mn", "15mn", "20mn", "25mn", "30mn", "35mn","40mn","50mn"];
    $scope.series = ['Series A'];
    $scope.data = [
        [63, 64, 65, 64, 63, 63, 64, 65, 65, 64],
    ];
    $scope.data1 = [
        [100, 98, 97, 95, 94, 91, 88, 87, 86,82],
    ];
    $scope.data2 = [
        [65, 59, 80, 81, 56, 55, 40, 65, 34, 43, 55],
    ];

})

