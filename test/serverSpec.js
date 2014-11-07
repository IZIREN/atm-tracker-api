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
                res.body.should.have.length(3);
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

    it('request to /api/atm/0 should respond with a single withdrawal with id 0',
        function(done) {
            request(app)
                .get('/api/atm/0')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.body.should.be.an.Object;
                    res.body.should.not.be.an.Array;
                    res.body.id.should.equal(0);
                    res.body.should.have.properties('cashAmount', 'serviceFee',
                        'dateOfTransaction', 'purchases');
                    res.body.purchases.should.be.an.Array;
                    done();
                });
    });
});


describe('API POST', function() {
    var item;
    before(function () {
        item = {
            cashAmount: 80,
            serviceFee: 2.50,
            dateOfTransaction: "2014-11-06T00:01:00Z",
        }
    });

    it('data to /api/atm should return an json obj with msg property',
        function (done) {
            request(app)
                .post('/api/atm')
                .send(item)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.body.should.have.property('msg');
                    request(app)
                        .get('/api/atm')
                        .set('Accept', 'application/json')
                        .expect(200)
                        .end(function(err, res) {
                            should.not.exist(err);
                            res.status.should.equal(200);
                            res.body.should.be.an.Array;
                            res.body.should.have.length(4);
                            res.body[3].should.be.an.Object;
                            res.body[3].id.should.equal(3);
                            res.body[3].should.have.properties(
                                'cashAmount', 'serviceFee',
                                'dateOfTransaction', 'purchases');
                            done();
                });
            });
    });
});

describe('API PUT', function() {
    it('data to /api/atm/1 should update data', function (done) {
        request(app)
            .put('/api/atm/1')
            .send({ serviceFee: 10 })
            .end(function (err, res) {
                should.not.exist(err);
                res.status.should.equal(200);
                res.body.should.have.property('msg');
                request(app)
                    .get('/api/atm/1')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        res.status.should.equal(200);
                        res.body.should.be.an.Object;
                        res.body.serviceFee.should.equal(10);
                        done();
                    })
            })
    });
});

describe('API DELETE', function() {
    it('request to /api/atm/1 should delete record');

});
