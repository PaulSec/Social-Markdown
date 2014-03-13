var file = require('./file.js');

exports.initSession = function(req, res) {
    file.generateNewTokenForFile(function (tokenFile) {
        // redirect to the file
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        res.writeHead(301, {Location: '/file/' + tokenFile});
        res.end();
    });
}