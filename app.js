var fs = require('fs');
var express = require('express');
var http = require('http');
var message = require('./lib/message.js');
var session = require('./lib/session.js');
var model = require('./lib/model.js');
var utils = require('./lib/utils.js');

var app = express();
var server = http.createServer(app); 

var logger = function(req, res, next) {
	message.log(req.connection.remoteAddress + " tried to access : " + req.url)
    next(); // Passing the request to the next handler in the stack.
}

// Configuration
app.configure(function() {
	// Session management
	app.use(express.cookieParser());
	app.use(express.session({secret: 'privateKeyForSession'}));
	app.use("/js", express.static(__dirname + '/public/js')); // javascript folder
	app.use("/css", express.static(__dirname + '/public/css')); // css folder

	app.set('views', __dirname + '/views'); // views folder
	app.set('view engine', 'ejs'); // view engine for this projet : ejs	

	app.use(express.bodyParser()); // for POST Requests
    app.use(logger); // Here you add your logger to the stack.
    app.use(app.router); // The Express routes handler.
});

// homepage
app.get('/', function(req, res) {
	res.render('index.ejs');
});

// About page
app.get('/about', function(req, res) {
	res.render('about.ejs');
});

// About page
app.get('/contact', function(req, res) {
	res.render('contact.ejs');
});

// About page
app.post('/saveDocument', function(req, res) {
	var idDocument = req.body.id;
	var markdownDocument = req.body.content;

	model.getFile(idDocument, function (file) {
		if (file == null) {
			utils.redirect(req, res, '/');
		} else {
			// save the file
			file.content = markdownDocument;
			model.saveFile(file);
			res.send('[]');
		}
	});
});

// Create a new document
app.get('/new', function(req, res) {
	session.initSession(req, res);
});

// access the file
app.get('/file/:idFile', function(req, res) {
	model.getFile(req.params.idFile, function (file) {
		if (file == null) {
			utils.redirect(req, res, '/new');
		} else {
			res.render('document.ejs', {content: file.content});
		}
	});
});

// bootstrap help 
app.get('/bootstrap', function(req, res) {
	res.render('bootstrap.ejs');
});

server.listen(8080);
message.info("Listening on port " + server.address().port);
