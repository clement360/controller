// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'music', 'sensor', 'control', "settings", 'starter.services', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    bluetoothSerial.enable(
        function () {
            console.log("Bluetooth is enabled");
        },
        function () {
            console.log("Bluetooth is not enabled");
        }
    );

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
      })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-control.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.sensors', {
        url: '/sensors',
        views: {
            'tab-sensors': {
                templateUrl: 'templates/tab-sensors.html',
                controller: 'SensorsCtrl'
            }
        }
    })

    .state('tab.music', {
        url: '/music',
        views: {
            'tab-music': {
                templateUrl: 'templates/tab-music.html',
                controller: 'MusicCtrl'
            }
        }
    })

    .state('tab.player', {
        url: '/player',
        views: {
            'tab-music': {
                templateUrl: 'templates/player.html',
                controller: 'PlayerCtrl'
            }
        }
    })

    .state('tab.settings', {
        url: '/settings',
        views: {
            'tab-settings': {
                templateUrl: 'templates/tab-settings.html',
                controller: 'SettingsCtrl'
            }
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
