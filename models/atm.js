// define the ATM model using the constructor pattern

var assert = require('assert');

var ATM = function(args) {
    var atm = {};

    assert.ok(args.id, 'id is required');

    atm.id = args.id;
    atm.createdAt = args.createdAt || new Date();
    atm.cashAmount = args.cashAmount || 0;
    atm.serviceFee = args.serviceFee || 0;
    atm.dateOfTransaction = new Date(args.dateOfTransaction) || new Date();
    atm.purchases = args.purchases || [];

    return atm;
};

module.exports = ATM;
