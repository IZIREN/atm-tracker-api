// server.js
//=============
// Simple RESTful web api to deliver information pertaining to
// ATM transactions.

// Initial Setup
// ============================================

// get the modules we need
var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// configure the app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


// routes for the API
// ============================================
var routes = require('./routes/index');

// register the routes
// all of our routes will be prefixed with '/api'
app.use('/api', routes);


// start the server
// ============================================
app.listen(port);
console.log('Server started and listening on port ' + port + '...');

module.exports = app;
