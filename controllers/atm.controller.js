var config = require('../config/config');
var dm = require('../util/datamanager');
var ATM = require('../models/atm');
var Purchase = require('../models/purchase');
var idGenerator = require('../util/id-generator');


// get data from data.json file.  For now, the data is represented
// in an in-memory array, with the initial values pulled from
// data.json file.
// TODO transition data from in-memory array to mongodb db using mongoose
var atmString = dm.getDataFromFile(config.inputFile);
var atmData = JSON.parse(atmString);

// id generator intialized to start with the next id after the initial
// data array length, since the id's are simply an integer.  Originally was
// using the index of the particular transaction in the array, however, if that
// transaction is deleted, the index -> id mapping is completely thrown off.
// This will no longer be needed once the data is stored in a mongodb db.
var idGen = new idGenerator(atmData.length);

// function not used at the moment, but leaving in the code
// in the event there is a need to populate the data with this
// property
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

exports.checkATMId = function(req, res, next, id) {
    if (id >= 0 && id < atmData.length) {
        next();
    } else {
        var err = new Error('reqested atmId does not exist');
        err.status = 404;
        next(err);
    }
};

exports.checkPurchaseId= function(req, res, next, id) {
    var transaction = findById(req.params.atmId);
    if (id >= 0 && id < transaction.purchases.length) {
        next();
    } else {
        var err = new Error('reqested purchase does not exist');
        err.status = 404;
        next(err);
    }
};
exports.list = function(req, res) {
    res.json(atmData);
};

exports.create = function(req, res) {
    var newItem = req.body;
    newItem.id = idGen.getNextId();
    atmData.push(new ATM(newItem));
    // dm.writeDataToFile(dataconfig.outputFile, atmData);
    dm.writeDataToFile(config.outputFile, atmData);
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
    // dm.writeDataToFile(dataconfig.outputFile, atmData);
    dm.writeDataToFile(config.outputFile, atmData);
    res.json({msg: 'atm updated!'});
};

exports.delete = function(req, res) {
    var element = findById(req.params.atmId);
    atmData.splice(atmData.indexOf(element), 1);
    // dm.writeDataToFile(dataconfig.outputFile, atmData);
    dm.writeDataToFile(config.outputFile, atmData);
    res.json({msg: 'atm transaction deleted'});
};


// functions for the 'purchases' of a particulary atm
// transaction
//===================================================

exports.listPurchases = function(req, res) {
    var element = findById(req.params.atmId);
    res.json(element.purchases);
};

exports.listOnePurchase = function(req, res) {
    var element = findById(req.params.atmId);
    res.json(element.purchases[req.params.purchaseId]);
};

exports.createPurchase = function(req, res) {
    var newPurchase = req.body;
    var element = findById(req.params.atmId);
    element.purchases.push(new Purchase(newPurchase));
    res.json({msg: 'new purchase saved!'});
};

exports.deletePurchase = function(req, res) {
    var element = findById(req.params.atmId);
    element.purchases.splice(req.params.purchaseId, 1);
    res.json({msg: 'purchase deleted!'});
};

// TODO: add function to update a purchase
