var dm = require('../util/datamanager');
var atm = require('../models/atm');
var purchase = require('../models/purchase');

var atmData = JSON.parse(dm.getDataFromFile('./data/data.json'));

exports.checkId = function(req, res, next, id) {
    if (id >= 0 && id < atmData.length) {
        next();
    } else {
        res.json({msg: 'requested atmId does not exist'});
    }
};


exports.list = function(req, res) {
    res.json(atmData);
};


exports.create = function(req, res) {
    var newItem = req.body;
    newItem.idx = atmData.length;
    atmData.push(atm(newItem));
    res.json({msg: 'data recieved and saved...'});
};

exports.listById = function(req, res) {
    res.json(atmData[req.params.atmId]);
};

exports.update = function(req, res) {
    var idx = req.params.atmId;
    for (var prop in req.body) {
        if (req.body[prop]) {
            atmData[idx][prop] = req.body[prop];
        }
    }
    console.log(atmData[idx]);
    res.json({msg: 'atm updated!'});
};

exports.delete = function(req, res) {
    atmData.splice(req.params.atmId, 1);
    res.json({msg: 'atm transaction deleted'});
};

exports.listPurchases = function(req, res) {
    res.json(atmData[req.params.atmId].purchases);
};

exports.createPurchase = function(req, res) {
    var newPurchase = req.body;
    atmData[req.params.atmId].purchases.push(purchase(newPurchase));
    res.json({msg: 'new purchase saved!'});
};