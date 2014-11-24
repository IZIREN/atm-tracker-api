/* jshint expr: true */

var should = require('should');
var Purchase = require('../app/models/purchase');

describe('Purchase object', function () {

    describe('default', function () {
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
});
