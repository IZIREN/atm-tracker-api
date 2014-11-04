// express.js
//=============

// Initial Setup
// ============================================

// get the modules we need
var express = require('express');
var bodyParser = require('body-parser');


module.exports = function() {
    var app = express();
    var apiRouter = express.Router();

    // configure the app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    require('../routes/index.server.routes')(app);
    require('../routes/atm.server.routes')(apiRouter);

    app.use(function(req, res, next) {
        console.log(req.method + ' request for ' + req.url);
        next();
    });

    app.use('/api', apiRouter);

    return app;
};