var file = require('./file.js');
var utils = require('./utils.js');

exports.initSession = function(req, res, typeDoc) {
    file.generateNewTokenForFile(typeDoc, function (tokenFile) {
        // redirect to the file
        utils.redirect(req, res, '/' + typeDoc + '/' + tokenFile);
    });
}