// express.js
//=============

// Initial Setup
// ============================================

// get the modules we need
var express = require('express');
var bodyParser = require('body-parser');


// make this function available to all other modules
// that require it.  This returns a handle to the
// app created by the call to express().  app is used
// the server.js file to actually start the server.
module.exports = function() {
    var app = express();
    var apiRouter = express.Router();

    // configure the app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // require the routes, passing the objects they need
    // to define the routes on.
    require('../routes/index.server.routes')(app);
    require('../routes/atm.server.routes')(apiRouter);
/*
    // define middleware for all routes.  This middleware
    // simply logs out the request method and url
    app.use(function(req, res, next) {
        console.log(req.method + ' request for ' + req.url);
        next();
    });
*/
    // http://baseurl.com/api is the root for all routes
    // defined by the apiRouter.
    app.use('/api', apiRouter);

    return app;
};
