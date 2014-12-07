// define the ATM model using the constructor pattern

var assert = require('assert');

var ATM = function(opts) {

    assert.ok(opts.id, 'id is required');

    this.id = opts.id;
    this.createdAt = opts.createdAt || new Date();
    this.cashAmount = opts.cashAmount || 0;
    this.serviceFee = opts.serviceFee || 0;
    this.dateOfTransaction = new Date(opts.dateOfTransaction) || new Date();
    this.purchases = opts.purchases || [];
    this.totalSpent = this.getTotalSpent();

};

ATM.prototype.getTotalSpent = function() {
    return this.purchases.reduce(function (a, b) {
        return a + b.amount;
    }, 0);
};

module.exports = ATM;
