var mongoose = require('mongoose');
var fs = require('fs');

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
    
    fs.readFile(__dirname + '/../views/markdown_template.ejs', function(err, data) {
        if (err) {
            throw err;
        }
        newFile.content = data;    
        newFile.save(function (err) {
            if (err) { 
                throw err; 
            }
            console.log('We successfully created ' + nameFile + " document.");
        });
    });
}

exports.getFile = function(nameFile, callback) {
    fileModel.find({id: nameFile}, function (err, file) {
        if (err) {
            throw err;
        }
        if (file.length == 0) {
            callback(null);
        } else {
            callback(file[0].content);
        }
    });
}