var crypto = require('crypto');
var model = require('./model.js');

exports.generateNewTokenForFile = function (callback) {
    var token = undefined;
    crypto.randomBytes(24, function(ex, buf) {
        token = buf.toString('hex');
        generateNewFile(token);
        callback(token);
    });
}

function generateNewFile(fileName) {
    model.createFile(fileName);
}
