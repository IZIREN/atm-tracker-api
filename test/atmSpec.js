var should = require('should');
var ATM = require('../models/atm');

describe('ATM object', function() {

    describe('defaults', function() {

        var atm = {};

        before(function() {

            atm = new ATM({ id: 999 });
        });

        it('id is 999', function() {
            atm.id.should.equal(999);
        });

        it('has a cashAmount', function() {
            atm.cashAmount.should.be.defined;
        });

        it('has a serviceFee', function() {
            atm.serviceFee.should.be.defined;
        });

        it('has a dateOfTransaction', function() {
            atm.dateOfTransaction.should.be.defined;
        });

        it('has a purchases array', function() {
            atm.purchases.should.be.defined;
            atm.purchases.should.be.an.Array;
        });
    });
});