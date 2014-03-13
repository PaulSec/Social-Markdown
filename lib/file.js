var crypto = require('crypto');

exports.generateNewFile = function(req, res) {
    
}

exports.generateNewTokenForFile = function (callback) {
    var token = undefined;
    crypto.randomBytes(24, function(ex, buf) {
        token = buf.toString('hex');
        callback(token);
    });
}