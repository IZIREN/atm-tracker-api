var request = require('supertest');
var should = require('should');

var app = require('../server');


describe('GET', function() {
    it('call to /api should respond with json', function(done) {
        request(app)
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('call to /api should return a message', function(done) {
        request(app)
            .get('/api')
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

    it('call to /api/atm should...', function(done) {
        request(app)
            .get('/api/atm')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.status.should.equal(200);
                done();
            });
    });

    it('call to /api/atm/1 should respond with json', function(done) {
        request(app)
            .get('/api/atm/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


describe('POST', function() {
    it('data to /api/atm should...');
});

