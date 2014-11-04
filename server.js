// server.js
//=============
// Simple RESTful web api to deliver information pertaining to
// ATM transactions.

var express= require('./config/express');

var app = express();

app.set('port', process.env.PORT || 8080);

// set up the environment as 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = app.listen(app.get('port'), function() {
    console.log('server listening on port ' + server.address().port);
});

module.exports = app;
