var dm = require('../util/datamanager');
var ATM = require('../models/atm');
var Purchase = require('../models/purchase');

var idGenerator = require('../util/id-generator');

var atmString = dm.getDataFromFile('./data/data.json');
var atmData = JSON.parse(atmString);

var idGen = new idGenerator(atmData.length);

function addCreatedAtProp(dataArray) {
    for (var i = 0; i < dataArray.length; i++) {
        if (!dataArray[i].createdAt) {
            dataArray[i].createdAt = new Date();
        }
    }
}

function findById(atmId) {
    for (var i = 0; i < atmData.length; i++) {
        if (atmData[i].id === Number(atmId)) {
            return atmData[i];
        }
    }
    return null;
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
    newItem.id = idGen.getNextId();
    atmData.push(new ATM(newItem));
    res.json({msg: 'data recieved and saved...'});
};

exports.listById = function(req, res) {
    var element = findById(req.params.atmId);
    res.json(element);
};

exports.update = function(req, res) {
    var element = findById(req.params.atmId);
    var idx = atmData.indexOf(element);
    for (var prop in req.body) {
        if (req.body[prop]) {
            atmData[idx][prop] = req.body[prop];
        }
    }
    res.json({msg: 'atm updated!'});
};

exports.delete = function(req, res) {
    var element = findById(req.params.atmId);
    atmData.splice(atmData.indexOf(element), 1);
    res.json({msg: 'atm transaction deleted'});
};

exports.listPurchases = function(req, res) {
    var element = findById(req.params.atmId);
    res.json(element.purchases);
};

exports.createPurchase = function(req, res) {
    var newPurchase = req.body;
    var element = findById(req.params.atmId);
    element.purchases.push(new Purchase(newPurchase));
    res.json({msg: 'new purchase saved!'});
};
