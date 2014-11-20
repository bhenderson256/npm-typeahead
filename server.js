// import/require the restify module
var restify = require('restify');
var search = new (require('./lib').Search);
// create the HTTP server
var server = restify.createServer();

// add query parsing extension to restify
server.use(restify.queryParser());

// packet lookup route
server.get('/search', function(req, res, cb) {
	search.search(req.params.q, function(err, results) {
		res.send(results);
		cb();
	});
});

// serve static javascript and css
server.get(/\/js|css|images\/?.*/, restify.serveStatic({
  directory: './assets'
}));

// serve the static index page.
server.get(/\/?/, restify.serveStatic({
  directory: './assets',
  default: 'index.html'
}));

/*
// add hello route
server.get('hello', function(req, res, cb) {
	res.send('Hello World');;
	return cb();
});
*/

// start listening...
server.listen(process.env.PORT || 5000, function() {
	console.log('%s listening at %s', server.name, server.url);
});
