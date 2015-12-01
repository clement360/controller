angular.module('starter.services', [])

.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Fake Name',
        lastText: 'this entire page is a placeholder.',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Andrew Jostlin',
        lastText: 'Did you get the ice cream?',
        face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
        id: 3,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 4,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

.factory('BT', function () {
    var connected;

    function btFailure(stage, error) { console.log("Bluetooth error during " + stage + " stage. Error: " + error); };

    return {
        devices: [],

        scan: function (callback) {
            var that = this;

            that.devices.length = 0;
            bluetoothSerial.discoverUnpaired(function (devices) {
                console.log("Scan complete");
                devices.forEach(function (device) {
                    console.log(JSON.stringify(device));
                    that.devices.push(device);
                })

                callback();
            }, function(error){
                console.log("ERROR: " + console.log(error));
                callback();
            });   
        },
        connect: function (deviceId, callback) {
            if (deviceId == 0)
                deviceId = "30:14:06:24:12:98";
            bluetoothSerial.connect(deviceId,
                
                function () {
                    //success
                    console.log("bluetooth connected!");
                    callback(true);
                },
                callback(false)
            );
        },
        disconnect: function (callback) {
            bluetoothSerial.disconnect(
                
                function () {
                    //success
                    console.log("bluetooth disconnected!");
                    callback(false);
                }, callback(true)
            );
        },
        write: function (value) {
            bluetoothSerial.write(value, function () { console.log("SUCCESS = " + value) }, function () { console.log("FAIL= " + value) });
        }
    };
});