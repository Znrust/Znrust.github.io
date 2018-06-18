(function (ext) {

    var blockHits = false;

    var server_url = "https://localhost";
    var server_port = 4715;
    
    ext._shutdown = function() {
        if (typeof poller == "number") {
          clearInterval(poller);
          poller = null;
        }
    };


    ext.postToChat = function(str, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        console.log(str);
        console.log(document.cookie);
        console.log($('.user-name').text());
        var cmdUrl = server_url + "/postToChat/" + encodeURIComponent(str);
        return ext.postAction(cmdUrl, callback);
    };

    ext.postToMe = function(str, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        console.log(str);
        console.log(document.cookie);
        console.log($('.user-name').text());
        var cmdUrl = server_url + "/postToMe/" + encodeURIComponent(str);
        return ext.postAction(cmdUrl, callback);
    };

    ext.playerPosToChat = function(callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/playerPosToChat";
        return ext.postAction(cmdUrl, callback);
    };

    ext.setPlayerPos = function(x, y, z, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/setPlayerPos/" + x + "/" + y + "/" + z;
        return ext.postAction(cmdUrl, callback);
    };

    ext.setBlock = function(x, y, z, blockType, blockData, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/setBlock/" + x + "/" + y + "/" + z + "/" + blockType + "/" + blockData;
        return ext.postAction(cmdUrl, callback);
    };

    ext.setBlocks = function(x1, y1, z1, x2, y2, z2, blockType, blockData, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/setBlocks/" + x1 + "/" + y1 + "/" + z1 + "/"
            + x2 + "/" + y2 + "/" + z2 + "/" + blockType + "/" + blockData;
        return ext.postAction(cmdUrl, callback);
    };

    ext.setLine = function(x1, y1, z1, x2, y2, z2, blockType, blockData, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/setLine/" + x1 + "/" + y1 + "/" + z1 + "/"
            + x2 + "/" + y2 + "/" + z2 + "/" + blockType + "/" + blockData;
        return ext.postAction(cmdUrl, callback);
    };

    ext.setCircle = function(x, y, z, r, blockType, blockData, plane, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var plane = plane || "XY";
        var cmds = {
            XY: "/setCircle/",
            YZ: "/setYZCircle/",
            XZ: "/setHCircle/",
        };
        var cmd = cmds[plane];
        var cmdUrl = server_url + cmd + x + "/" + y + "/"
            + z + "/" + r + "/" + blockType + "/" + blockData;
        return ext.postAction(cmdUrl, callback);
    };

    ext.setSphere = function(x, y, z, r, blockType, blockData, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};

        var cmdUrl = server_url + "/setSphere/" + x + "/" + y + "/"
            + z + "/" + r + "/" + blockType + "/" + blockData;
        return ext.postAction(cmdUrl, callback);
    };

    ext.setText = function(str, x, y, z, blockType, blockData, plane, pixelSize, callback){
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};

        var cmdUrl = server_url + "/setText/" + str + "/" + x + "/" + y + "/"
            + z + "/" + blockType + "/" + blockData + "/" + plane + "/" + pixelSize;
        return ext.postAction(cmdUrl, callback);
    }

    // get one coord (x, y, or z) for playerPos
    ext.getPlayerPos = function(posCoord, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/getPlayerPos/" + posCoord;
        return ext.postAction(cmdUrl, callback);
    };

    ext.getPlayerRotation = function(callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/getPlayerRotation";
        return ext.postAction(cmdUrl, callback);
    };
    ext.setPlayerRotation = function(rotation, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/setPlayerRotation/" + rotation;
        return ext.postAction(cmdUrl, callback);
    };
    ext.getPlayerPitch = function(callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/getPlayerPitch";
        return ext.postAction(cmdUrl, callback);
    };
    ext.setPlayerPitch = function(pitch, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/setPlayerPitch/" + pitch;
        return ext.postAction(cmdUrl, callback);
    };

    // get one coord (x, y, or z) for playerPos
    ext.getBlock = function(x, y, z, posType, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/getBlock/" + x + "/" + y + "/" + z + "/" + posType;
        return ext.postAction(cmdUrl, callback);
    };

    ext.spawnEntity = function (x, y, z, entityType, entityData, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/spawnEntity/" + x + "/" + y + "/" + z + "/" + entityType + "/" + entityData;
        return ext.postAction(cmdUrl, callback);
    }

    ext.strikeLightning = function (x, y, z, callback) {
        if(!ext.checkReady() || ext.checkOverclock(false)) {callback();return};
        var cmdUrl = server_url + "/strikeLightning/" + x + "/" + y + "/" + z;
        return ext.postAction(cmdUrl);
    }

    var descriptor = {
        blocks: [
            ["h", "Minecraft", 'Minecraft'],
            ["w", 'post to chat %s', 'postToChat', 'message'],
            ["w", 'post to me %s', 'postToMe', 'message'],
            ["w", "post Player.pos chat", "playerPosToChat"],
            ["w", "set Player pos to x:%n y:%n z:%n", "setPlayerPos", 0, 0, 0],
            ["w", "set player rotation to %n", "setPlayerRotation", 0],
            ["w", "set player pitch angle to %n", "setPlayerPitch", 0],
            ["w", "set block pos x:%n y:%n z:%n to type %n data %n", "setBlock", 0, 0, 0, 1, 0],
            ["w", "spawn entity at pos x:%n y:%n z:%n entity type %m.entityType with data %n", "spawnEntity", 0, 0, 0, '狼', 0],
            ["w", "set blocks pos x1:%n y1:%n z1:%n to x2:%n y2:%n z2:%n to type %n data %n", "setBlocks", 0, 0, 0, 0, 0, 0, 1, 0],
            ["w", "set line from x1:%n y1:%n z1:%n to x2:%n y2:%n z2:%n to type %n data %n", "setLine", 0, 0, 0, 0, 0, 0, 1, 0],
            ["w", "set circle center x:%n y:%n z:%n radius r:%n to type %n data %n at %m.plane plane", "setCircle", 0, 0, 0, 0, 1, 0, 'XY'],
            ["w", "set sphere center at x1:%n y1:%n z1:%n radius r:%n to type %n data %n", "setSphere", 0, 0, 0, 0, 1, 0],
            ["w", "set text %s at x1:%n y1:%n z1:%n with type %n data %n on plane %m.plane pixel size %m.pixelSize", "setText", "Hello", 0, 0, 0, 1, 0, 'XY', 1],
            ["w", "strike lighting at x:%n y:%n z:%n", "strikeLightning", 0, 0, 0],
            ["R", "get player pos %m.pos", "getPlayerPos", 'x'],
            ["R", "get player rotation", "getPlayerRotation"],
            ["R", "get player pitch angle", "getPlayerPitch"],
            ["R", "get block pos x:%n y:%n z:%n", "getBlock", 0, 0, 0],
        ],
        menus: {
            pos: ['x', 'y', 'z'],
            entityType:["黑色凋零骷","炸药凋灵骷","尸壳","僵尸村民","骷髅马","僵尸马","苦力怕","骷髅","蜘蛛","巨人","僵尸","史莱姆","妖怪","僵尸猪人","末影人","洞穴蜘蛛","末影龙","凋零","蝙蝠","女巫","猪","绵羊","牛","鸡","鱿鱼","狼","蘑菇牛","雪人","豹猫","铁傀儡","马","兔子","北极熊","羊驼","羊驼的口水","鹦鹉","村民"],
            plane: ['XY', 'YZ', 'XZ'],
            pixelSize: ['1', '2', '3'],
        },
    };

    console.log("Load Scratch扩展");
    ScratchExtensions.register('ScratchX', descriptor, ext);

})({});