/* jshint expr: true */

require('should');
var Purchase = require('../models/purchase.server.model');

describe('Purchase Model Unit Tests:', function () {

    describe('Testing default values', function () {
        var purchase = null;

        before(function () {
            purchase = new Purchase({});
        });

        after(function () {
            purchase = null;
        });

        it('has amount property', function () {
            purchase.amount.should.be.defined;
        });

        it('amount property is 0.00', function () {
            purchase.amount.should.equal(0.00);
        });

        it('has description property', function () {
            purchase.description.should.be.defined;
        });

        it('description property is a string', function () {
            purchase.description.should.startWith('no');
            purchase.description.should.endWith('provided');
        });
    });

    describe('Testing instantiation with specific values', function () {

        var purchase = null;

        before(function () {
            purchase = new Purchase({
                amount: 12,
                description: 'test amount'
            });
        });

        it('amount property is 12', function () {
            purchase.amount.should.equal(12);
        });

        it('description property is \'test amount\'', function () {
            purchase.description.should.startWith('test');
            purchase.description.should.endWith('amount');
        });

    });
});
