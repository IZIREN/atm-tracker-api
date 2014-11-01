var express = require('express');
var dm = require('../data/datamanager');
var ATM = require('../models/atm');
var Purchase = require('../models/purchase');

var api = express.Router();

// load data from json files
// ============================================
var atmData= null;
dm.getDataFromFile('data/data.json', function(data) {
    atmData = JSON.parse(data);
});

var userData = null;
dm.getDataFromFile('data/user.json', function(data) {
    userData = JSON.parse(data);
});

api.use(function(req, res, next) {
    console.log(req.method + ' request for ' + req.url);
    next();
});


api.param('atm_id', function(req, res, next, id) {
    console.log('doing some validation on ' + id);
    if (id >= 0 && id < atmData.length) {
        console.log('id checks out...');
        next();
    } else {
        res.json({msg: 'requested atm_id does not exist'});
    }
});


api.get('/', function(req, res) {
    res.json({msg: 'Very well...! welcome to the api!'});
});


// routes for the API
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

api.route('/atm/:atm_id')

    .get(function(req, res) {
        res.json(atmData[req.params.atm_id]);

    })

    .put(function(req, res) {
        var idx = req.params.atm_id;
        for (var prop in req.body) {
            if (req.body[prop]) {
                atmData[idx][prop] = req.body[prop];
            }
        }
        console.log(atmData[idx]);
        res.json({msg: 'atm updated!'});
    })

    .delete(function(req, res){
        atmData.splice(req.params.atm_id, 1);
        res.json({msg: 'atm transaction deleted'});
    });

api.route('/atm/:atm_id/purchases')

    .get(function(req, res) {
        res.json(atmData[req.params.atm_id].purchases);
    })

    .post(function(req, res){
        var newPurchase = req.body;
        atmData[req.params.atm_id].purchases.push(new Purchase(newPurchase));
        res.json({msg: 'new purchase saved!'});
    });

module.exports = api;
