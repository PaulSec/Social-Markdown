var mongoose = require('mongoose');

// connect
mongoose.connect('mongodb://localhost/website', function(err) {
  if (err) { throw err; }
});

// Schema
var fileSchema = new mongoose.Schema({
    id : { type : String},
    content : String
});

// model
var fileModel = mongoose.model('files', fileSchema);

// create the file
exports.createFile = function(nameFile) {
    var newFile = new fileModel({ id : nameFile });
    newFile.content = '### Here is a sample of Markdown';

    newFile.save(function (err) {
        if (err) { throw err; }
        console.log('We successfully created ' + nameFile + " document.");
    });
}

exports.fileExists = function(nameFile, callback) {
    // console.log(nameFile);
    fileModel.find({id: nameFile}, function (err, file) {
        if (err) {
            throw err;
        }
        if (file.length == 0) {
            callback(false);
        } else {
            callback(true);
        }
    });
}