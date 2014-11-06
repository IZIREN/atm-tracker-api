var request = require('supertest');
var should = require('should');

var app = require('../server');


describe('API GET', function() {
    it('request to / should respond with json', function(done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('request to / should return a message', function(done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.status.should.equal(200);
                res.body.should.have.property("msg");
                res.body.msg.should.not.equal(undefined);
                done();
            });
    });

    it('request to /api/atm should respond with json', function(done) {
        request(app)
            .get('/api/atm')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('request to /api/atm should respond with list of withdrawals', function(done) {
        request(app)
            .get('/api/atm')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.status.should.equal(200);
                res.body.should.be.an.Array;
                res.body[0].should.be.an.Object;
                res.body[0].should.have.properties('cashAmount', 'serviceFee',
                    'dateOfTransaction', 'purchases');
                done();
            });
    });

    it('request to /api/atm/0 should respond with json', function(done) {
        request(app)
            .get('/api/atm/0')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('request to /api/atm/0 should respond with a single withdrawal', function(done) {
        request(app)
            .get('/api/atm/0')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.status.should.equal(200);
                res.body.should.be.an.Object;
                res.body.should.not.be.an.Array;
                res.body.should.have.properties('cashAmount', 'serviceFee',
                    'dateOfTransaction', 'purchases');
                res.body.purchases.should.be.an.Array;
                done();
            });
    });
});


describe('API POST', function() {
    it('data to /api/atm should...');
});

describe('API PUT', function() {
    it('data to /api/atm/1 should update data');
});

describe('API DELETE', function() {
    it('request to /api/atm/1 should delete record');

});
