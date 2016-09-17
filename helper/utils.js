const crypto = require('crypto');
const secret = 'abcdefg';
var method = utils.prototype;
var IsDebug = false;
var colors = require('colors');
var os = require('os');

function utils(isDebug) {
    this.IsDebug = isDebug;
}

method.getHash = function (text) {
    console.log("Hashing For:" + text);
    var hash = crypto.createHash('sha256').update(text, 'utf8').digest('hex');
    return hash;
};

method.log = function (text, type, data) {
    var logString = getDate();
    var typeString = '';

    if (type == 'success' || type == 'error') {
        typeString = type.toUpperCase();
    }
    else {
        typeString = 'INFO';
    }

    if (text == null) {
        logString = logString + ' [' + typeString.substring(0, 4) + '] ' + JSON.stringify(data);
    }
    else {
        logString = logString + ' [' + typeString.substring(0, 4) + '] ' + text;
    }

    console.log(logString);
}

method.error = function (text, data) {
    var logString = getDate();
    var typeString = 'ERRO';

    if (text == null) {
        logString = logString + ' [' + typeString + '] ' + JSON.stringify(data);
    }
    else {
        logString = logString + ' [' + typeString + '] ' + text;
    }

    console.log(logString.red);
}

method.info = function (text, data) {
    var logString = getDate();
    var typeString = 'INFO';

    if (text == null) {
        logString = logString + ' [' + typeString + '] ' + JSON.stringify(data);
    }
    else {
        logString = logString + ' [' + typeString + '] ' + text;
    }

    console.log(logString.green);
}

method.getUNIXTimestamp = function () {
    return Math.floor(Date.now() / 1000);
}

method.getIP = function (req) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    return ip;
}

function getDate() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function getUNIXTimestamp() {
    return Math.floor(Date.now() / 1000);
}

method.logHostSystemInfo = function () {
    try {
        var systemInfo = {
            'Arch': os.arch(),
            'CPUs': os.cpus(),
            'HostName': os.hostname(),
            'Network Interface': os.networkInterfaces(),
            'Platform': os.platform(),
            'Release': os.release(),
            'Uptime': os.uptime()
        };

        console.log("[HOST SYSTEM INFO] :" + JSON.stringify(systemInfo) + "\n\n\n\n\n");
    }
    catch (e) {

    }

}

module.exports = utils;



