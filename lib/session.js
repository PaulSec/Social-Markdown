var file = require('./file.js');

exports.initSession = function(req, res) {
    file.generateNewTokenForFile(function (tokenFile) {
        // redirect to the file
        res.writeHead(301, {Location: '/file/' + tokenFile});
        res.end();
    });
}