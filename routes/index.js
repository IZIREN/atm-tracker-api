var express = require('express');
var dm = require('../data/datamanager');
var ATM = require('../models/atm');
//var Purchase = require('../purchase');

var api = express.Router();

// load data from json files
// ============================================
var atmData= null;
dm.getDataFromFile('data/data.json', function(data) {
    atmData = JSON.parse(data);
    console.log("atm data loaded...");
});

var userData = null;
dm.getDataFromFile('data/user.json', function(data) {
    userData = JSON.parse(data);
    console.log('user data loaded...');
});

api.use(function(req, res, next) {
    console.log(req.method + ' request for ' + req.url);
    next();
});


api.get('/', function(req, res) {
    res.json({msg: 'Very well...! welcome to the api!'});
});


// more routes for our API will go here.
api.route('/atm')

    .post(function(req, res) {
        var newItem = req.body;
        newItem.idx = atmData.length;
        atmData.push(new ATM(newItem));
        dm.writeDataToFile('/data/data1.json', atmData);
        res.json({msg: 'data recieved and saved...'});
    })

    .get(function(req, res) {
        res.json(atmData);
    });

module.exports = api;
