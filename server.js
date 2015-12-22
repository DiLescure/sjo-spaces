// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ),
    vhost = require( 'vhost' );

function createVirtualHost(domainName, dirPath) {
    return vhost(domainName, express.static( dirPath ));
}

//Create server
var app = express();

//Create the virtual hosts
var homeHost = createVirtualHost("sjo.space", "homeland");
var understandHost = createVirtualHost("understand.sjo.space", "understand-javascript");

//Use the virtual hosts
app.use(homeHost);
app.use(understandHost);

//Error handling
app.use(function(req, res, next) { // i catch 404s
  res.status(404);
  res.render('Get out of here right meow...');
});

app.use(function(err, req, res, next) { // i catch errors, but 404 is not an error
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Start server
var port = process.env.PORT || 8080;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});