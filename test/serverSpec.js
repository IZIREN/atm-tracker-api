var request = require('supertest');
var should = require('should');

var app = require('../server');


describe('GET', function() {
    it('call to / should respond with json', function(done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('call to / should return a message', function(done) {
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

    it('call to /api/atm should respond with json', function(done) {
        request(app)
            .get('/api/atm')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('call to /api/atm should respond with list of withdrawals', function(done) {
        request(app)
            .get('/api/atm')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.status.should.equal(200);
                res.body.should.be.an.Array;
                res.body[0].should.be.an.Object;
                res.body[0].should.have.properties('cashAmount', 'serviceFee', 'date', 'purchases');
                done();
            });
    });

    it('call to /api/atm/0 should respond with json', function(done) {
        request(app)
            .get('/api/atm/0')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('call to /api/atm/0 should respond with a single withdrawal', function(done) {
        request(app)
            .get('/api/atm/0')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.status.should.equal(200);
                res.body.should.be.an.Object;
                res.body.should.not.be.an.Array;
                res.body.should.have.properties('cashAmount', 'serviceFee', 'date', 'purchases');
                res.body.purchases.should.be.an.Array;
                done();
            });
    });
});


describe('POST', function() {
    it('data to /api/atm should...');
});

