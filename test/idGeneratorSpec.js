var should = require('should');
var idGenerator = require('../util/id-generator');

describe('The id generator', function () {

    describe('with no initial seed parameter', function () {
        var sut = null;

        beforeEach(function () {
            sut = new idGenerator();
        })

        it('initializes id to start at 0', function () {
            sut.should.be.defined;
            sut.getNextId().should.equal(0);
        });

        it('three calls to getNextId returns 2', function () {
            sut.should.be.defined;
            sut.getNextId();
            sut.getNextId();
            var nextId = sut.getNextId();
            nextId.should.equal(2);
        });
    });

    describe('with an initial parameter of 10', function () {
        var sut = null;

        beforeEach(function () {
            sut = new idGenerator(10);
        });

        it('initializes starting id number to 10', function () {
            sut.should.be.defined;
            sut.getNextId().should.equal(10);
        });

        it('five calls to getNextId returns 14', function () {
            sut.should.be.defined;
            sut.getNextId();
            sut.getNextId();
            sut.getNextId();
            sut.getNextId();
            var nextId = sut.getNextId();
            nextId.should.equal(14);
        });

        it('sets id to 100 when resetId is called with param 100', function () {
            sut.resetId(100);
            sut.getNextId().should.equal(100);
        });
    });
});
