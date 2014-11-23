// define the ATM model using the constructor pattern

var assert = require('assert');

var ATM = function(opts) {
    var atm = {};

    assert.ok(opts.id, 'id is required');

    atm.id = opts.id;
    atm.createdAt = opts.createdAt || new Date();
    atm.cashAmount = opts.cashAmount || 0;
    atm.serviceFee = opts.serviceFee || 0;
    atm.dateOfTransaction = new Date(opts.dateOfTransaction) || new Date();
    atm.purchases = opts.purchases || [];

    return atm;
};

module.exports = ATM;
