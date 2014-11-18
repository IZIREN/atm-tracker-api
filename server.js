// server.js
//=============
// Simple RESTful web api to deliver information pertaining to
// ATM transactions.

// set up the environment as 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express= require('./config/express');

// get handle to the app created and configured in config/express.js
var app = express();

app.set('port', process.env.PORT || 8080);


var server = app.listen(app.get('port'), function() {
    console.log('server listening on port %d', server.address().port);
});

// export the app for use when testing
module.exports = app;
