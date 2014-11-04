
var dm = require('../data/datamanager');
var atm = require('../models/atm');
var purchase = require('../models/purchase');



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

module.exports = function(api) {

    api.param('atmId', function(req, res, next, id) {
        console.log('doing some validation on ' + id);
        if (id >= 0 && id < atmData.length) {
            console.log('id checks out...');
            next();
        } else {
            res.json({msg: 'requested atmId does not exist'});
        }
    });

    // routes for the API
    api.route('/atm')

        .post(function(req, res) {
            var newItem = req.body;
            newItem.idx = atmData.length;
            atmData.push(atm(newItem));
            res.json({msg: 'data recieved and saved...'});
        })

        .get(function(req, res) {
            res.json(atmData);
        });

    api.route('/atm/:atmId')

        .get(function(req, res) {
            res.json(atmData[req.params.atmId]);

        })

        .put(function(req, res) {
            var idx = req.params.atmId;
            for (var prop in req.body) {
                if (req.body[prop]) {
                    atmData[idx][prop] = req.body[prop];
                }
            }
            console.log(atmData[idx]);
            res.json({msg: 'atm updated!'});
        })

        .delete(function(req, res){
            atmData.splice(req.params.atmId, 1);
            res.json({msg: 'atm transaction deleted'});
        });

    api.route('/atm/:atmId/purchases')

        .get(function(req, res) {
            res.json(atmData[req.params.atmId].purchases);
        })

        .post(function(req, res){
            var newPurchase = req.body;
            atmData[req.params.atmId].purchases.push(purchase(newPurchase));
            res.json({msg: 'new purchase saved!'});
        });

    return api;
};
