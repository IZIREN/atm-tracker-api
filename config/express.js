// express.js
//=============

// Initial Setup
// ============================================

// get the modules we need
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');


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

    // configure the app to use morgan (aka logger) in
    // dev mode.  Provides log msgs to the console in the form:
    // VERB /api/url status response time (ms) - res[content-length]
    app.use(logger('dev'));

    // require the routes, passing the objects they need
    // to define the routes.
    require('../routes/index.server.routes')(app);
    require('../routes/atm.server.routes')(apiRouter);

    // http://baseurl.com/api is the root for all routes
    // defined by the apiRouter.
    app.use('/api', apiRouter);


    // the below middleware needs to be the last middleware defined.
    // If a request makes it this far, it hasn't been routed by any
    // of the previously defined routes, so it must be a 404.

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers
    //====================
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                msg: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json( {
            msg: err.message,
            error: {}
        });
    });

    return app;
};
