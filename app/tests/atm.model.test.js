/* jshint expr: true */

require('should');
var ATM = require('../models/atm.server.model');

describe('ATM Model Unit Tests:', function () {

    describe('Testing default values', function () {

        var atm = {};

        before(function () {

            atm = new ATM({ 
                id: 998
            });
        });

        it('id is 998', function () {
            atm.id.should.equal(998);
        });

        it('has a cashAmount', function () {
            atm.cashAmount.should.be.defined;
        });

        it('has a serviceFee', function () {
            atm.serviceFee.should.be.defined;
        });

        it('has a dateOfTransaction', function () {
            atm.dateOfTransaction.should.be.defined;
        });

        it('has a purchases array', function () {
            atm.purchases.should.be.defined;
            atm.purchases.should.be.an.Array;
        });

    });

    describe('Testing instantiation with specific values', function () {
        var atm = {};

        before(function () {

            atm = new ATM({ 
                id: 999,
                cashAmount: 20,
                serviceFee: 2.50,
                purchases: [
                    {amount: 1, description: 'test purchase 1'},
                    {amount: 2, description: 'test purchase 2'},
                    {amount: 3, description: 'test purchase 3'},
                    {amount: 4, description: 'test purchase 4'}
                ]
            });
        });

        it('id is 999', function () {
            atm.id.should.equal(999);
        });

        it('has cashAmount of 20', function () {
            atm.cashAmount.should.equal(20);
        });

        it('has serviceFee of 2.50', function () {
            atm.serviceFee.should.equal(2.50);
        });

        it('has a purchases array of length 4', function () {
            atm.purchases.should.have.length(4);
        });

        it('has total amount spent of 10', function () {
            atm.totalSpent.should.equal(10);
        });

    });
});
