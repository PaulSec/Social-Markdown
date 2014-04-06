var crypto = require('crypto');
var model = require('./model.js');

exports.generateNewTokenForFile = function (typeDoc, callback) {
    var token = undefined;
    crypto.randomBytes(24, function(ex, buf) {
        token = buf.toString('hex');
        generateNewFile(token, typeDoc);
        callback(token);
    });
}

function generateNewFile(fileName, typeDoc) {
    model.createFile(fileName, typeDoc);
}
