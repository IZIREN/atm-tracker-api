// server.js
//=============
// Simple RESTful web api to deliver information pertaining to
// ATM transactions.

var express= require('./config/express');

var app = express();

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
    console.log('server listening on port ' + server.address().port);
});

module.exports = app;