var file = require('./file.js');
var utils = require('./utils.js');

exports.initSession = function(req, res) {
    file.generateNewTokenForFile(function (tokenFile) {
        // redirect to the file
        utils.redirect(req, res, '/file/' + tokenFile);
    });
}