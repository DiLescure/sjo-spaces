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

//Use the virtual hosts
app.use(homeHost);

//Start server
var port = process.env.PORT || 8080;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});