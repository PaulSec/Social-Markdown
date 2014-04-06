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
	app.use("/img", express.static(__dirname + '/public/img')); // css folder

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
app.get('/markdown/new', function(req, res) {
	session.initSession(req, res, 'markdown');
});

// access the file
app.get('/markdown/:id', function(req, res) {
	model.getFile(req.params.id, function (file) {
		if (file == null) {
			utils.redirect(req, res, '/markdown/new');
		} else {
			res.render('markdown.ejs', {content: file.content});
		}
	});
});

// Create a new document
app.get('/doc/new', function(req, res) {
	session.initSession(req, res, 'doc');
});

// access the file
app.get('/doc/:id', function(req, res) {
	model.getFile(req.params.id, function (file) {
		if (file == null) {
			utils.redirect(req, res, '/doc/new');
		} else {
			// res.send('On va faire du doc ici');
			res.render('doc.ejs', {content: file.content});
		}
	});
});


// bootstrap help 
app.get('/bootstrap', function(req, res) {
	res.render('bootstrap.ejs');
});

// test help 
app.get('/test', function(req, res) {
	fs.readFile('./test.html', function read(err, data) {
		if (err) {
		    throw err;
		}
		res.write(data);
		res.end();
	});
});

server.listen(8080);
message.info("Listening on port " + server.address().port);
