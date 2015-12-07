angular.module('music', [])

.controller('PlayerCtrl', function ($scope, BT) {
    //Empty music controller for now

    $scope.music = 0;
})

.controller('BrowseCtrl', function ($scope, $ionicPlatform, $window) {

    $ionicPlatform.ready(function(){
        getRootFiles();       //Load root directory

        $scope.getContents = function (path) {
            getFiles(path);                   
        }

        function getRootFiles() {

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

        function getParentDirectory(path) {
            var parent;

            window.resolveLocalFileSystemURI(path, function (fs) {
                fs.getParent(function (result) {
                    parent = result;
                }, function (error) {
                    console.log("ERROR: " + error);
                });
            }, function (error) {
                console.log("ERROR: " + error);
            });

            return parent;
        }

        function getFiles(path) {
            window.resolveLocalFileSystemURI(path, function (fs) {
                var directoryReader = fs.createReader();
                directoryReader.readEntries(function (entries) {
                    if (entries.length > 0) {
                        var temp = [];

                        $scope.$apply(function (){
                            $scope.files = onlyMusicAndDir(entries);
                        });

                        $scope.$apply(function(){
                            var parent = getParentDirectory(path);

                            parent.name = "...";
                            $scope.files.unshift(parent);
                        });
                    }
                }, function (error) {
                    console.log("ERROR: " + error);
                });
            }, function (error) {
                console.log("ERROR: " + error);
            });
        }

        function onlyMusicAndDir(entries) {
            var result = [];

            for (var i = 0; i < entries.length; i++) {
                var e = entries[i];

                // Only add mp3s and directories
                if (e.isDirectory || e.nativeURL.search("mp3") > 0) {
                    result.push(e);
                }
            }

            return result;
        }
    });
})