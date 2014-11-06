var dm = require('../util/datamanager');
var ATM = require('../models/atm');
var Purchase = require('../models/purchase');

var atmString = dm.getDataFromFile('./data/data.json');
var atmData = JSON.parse(atmString);

function addCreatedAtProp(dataArray) {
    for (var i = 0; i < dataArray.length; i++) {
        if (!dataArray[i].createdAt) {
            dataArray[i].createdAt = new Date();
        }
    }
}

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
    newItem.id = atmData.length;
    atmData.push(new ATM(newItem));
    res.json({msg: 'data recieved and saved...'});
};

exports.listById = function(req, res) {
    res.json(atmData[req.params.atmId]);
};

exports.update = function(req, res) {
    var id = req.params.atmId;
    for (var prop in req.body) {
        if (req.body[prop]) {
            atmData[id][prop] = req.body[prop];
        }
    }
    console.log(atmData[id]);
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
    atmData[req.params.atmId].purchases.push(new Purchase(newPurchase));
    res.json({msg: 'new purchase saved!'});
};
