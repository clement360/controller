angular.module('music', [])

.controller('MusicCtrl', function ($scope, BT) {
    //Empty music controller for now
})

.controller('PlayerCtrl', function ($scope, $ionicPlatform, $window, $ionicScrollDelegate, MusicFactory) {

    var currentTrack = null;

    $ionicPlatform.ready(function () {
        LoadRootFiles();

        $scope.getContents = function (path) {
            if (path.search(".mp3") == -1) {
                loadFilesAndDirectories(path);
            } else {
                MusicFactory.startTrack(path);
            };
        }

        //Show name of the track
        $scope.showTrack = function () {
            window.alert(MusicFactory.trackName);
        }

        //Play audio
        $scope.playTrack = function () {
            MusicFactory.playTrack();
        };

        //Pause audio
        $scope.pauseTrack = function () {
            MusicFactory.pauseTrack();
        };

        //Stop audio
        $scope.stopTrack = function () {
            MusicFactory.stopTrack();
        };

        //Load root directory
        function LoadRootFiles() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                var directoryReader = fs.root.createReader();
                directoryReader.readEntries(function (entries) {
                    var temp = [];
                    $scope.files = onlyMusicAndDir(entries);
                }, function (error) {
                    console.log("ERROR: " + error);
                });
            }, function (error) {
                console.log("ERROR: " + error);
            });
        }

        //Load files and directory at path
        function loadFilesAndDirectories(path) {
            window.resolveLocalFileSystemURI(path, function (fs) {
                var directoryReader = fs.createReader();
                directoryReader.readEntries(function (entries) {
                    var previousPath = $scope.files[0].fullPath;
                    $scope.files = onlyMusicAndDir(entries);
                    fs.getParent(function (result) {
                        $scope.$apply(function () {
                            if (result.fullPath != previousPath) {
                                if ($scope.files.length > 0) {
                                    $scope.files.unshift(result);
                                } else {
                                    $scope.files.push(result, { name: "Empty folder" });
                                }

                                $scope.files[0].name = "Go back to previous directory";
                            }
                        });

                        $ionicScrollDelegate.scrollTop();
                    }, function (error) {
                        console.log("ERROR: " + error);
                    });
                }, function (error) {
                    console.log("ERROR: " + error);
                });
            }, function (error) {
                console.log("ERROR: " + error);
            });
        }

        //Load only MP3s or directory
        function onlyMusicAndDir(entries) {
            var result = [];

            for (var i = 0; i < entries.length; i++) {
                var e = entries[i];
                if (e.isDirectory || e.nativeURL.search("mp3") > 0)
                    result.push(e);
            }

            return result;
        }
    });
})