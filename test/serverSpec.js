/* jshint expr: true */

// set the environment to 'test'.  This will determine
// which config object is returned from config/data.js.
// This config object determines which input and output
// files to use during testing.
process.env.NODE_ENV = 'test';

var request = require('supertest');
var should = require('should');

var app = require('../server');


describe('API', function () {
    describe('GET /', function () {

        it('responds with json and status of 200', function (done) {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('returns a message', function (done) {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.body.should.have.property("msg");
                    res.body.msg.should.not.equal(undefined);
                    done();
                });
        });
    });

    describe('GET /api/atm', function () {

        it('responds with json and status of 200', function (done) {
            request(app)
                .get('/api/atm')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('responds with list of withdrawals', function (done) {
            request(app)
                .get('/api/atm')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
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
    });

    describe('GET /api/atm/0', function () {

        it('responds with json and status of 200', function (done) {
            request(app)
                .get('/api/atm/0')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('responds with a single withdrawal with id 0',
            function (done) {
                request(app)
                    .get('/api/atm/0')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
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

    describe('GET /api/atm/99', function () {

        it('responds with json and status of 404', function (done) {
            request(app)
                .get('/api/atm/99')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

        it('returns a message', function (done) {
            request(app)
                .get('/api/atm/99')
                .set('Accept', 'application/json')
                .expect(404)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(404);
                    res.body.should.have.property("msg");
                    res.body.msg.should.not.equal(undefined);
                    done();
                });
        });
    });

    describe('GET /api/foo', function () {

        it('responds with json and status of 404', function (done) {
            request(app)
                .get('/api/foo')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

        it('returns an error message', function (done) {
            request(app)
                .get('/api/foo')
                .set('Accept', 'application/json')
                .expect(404)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(404);
                    res.body.should.have.property("msg");
                    res.body.should.have.property("error");
                    res.body.msg.should.not.equal(undefined);
                    done();
                });
        });
    });

    describe('GET /api/atm/1/purchases', function () {

        it('responds with json and status of 200', function (done) {
            request(app)
                .get('/api/atm/1/purchases')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('responds with list of purchases', function (done) {
            request(app)
                .get('/api/atm/1/purchases')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.body.should.be.an.Array;
                    res.body.should.have.length(3);
                    res.body[0].should.be.an.Object;
                    res.body[0].should.have.properties('amount', 'description');
                    done();
                });
        });
    });

    describe('POST /api/atm', function () {

        var item;
        before(function () {
            item = {
                cashAmount: 80,
                serviceFee: 2.50,
                dateOfTransaction: "2014-11-06T00:01:00Z",
            };
        });

        it('returns an json obj with msg property',
            function (done) {
                request(app)
                    .post('/api/atm')
                    .send(item)
                    .end(function (err, res) {
                        should.not.exist(err);
                        res.status.should.equal(200);
                        res.body.should.have.property('msg');

                        // once the item is added (via POST), need to verify
                        // the array length has increased by one with a GET
                        // request to /api/atm
                        request(app)
                            .get('/api/atm')
                            .set('Accept', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
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

    describe('POST /api/atm/1/purchases', function () {

        var item;
        before(function () {
            item = {
                amount: 22,
                description: "haircut"
            };
        });

        it('returns an json obj with msg property',
            function (done) {
                request(app)
                    .post('/api/atm/1/purchases')
                    .send(item)
                    .end(function (err, res) {
                        should.not.exist(err);
                        res.status.should.equal(200);
                        res.body.should.have.property('msg');

                        // once the item is added (via POST), need to verify
                        // the array length has increased by one with a GET
                        // request to /api/atm/1/purchases
                        request(app)
                            .get('/api/atm/1/purchases')
                            .set('Accept', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
                                should.not.exist(err);
                                res.status.should.equal(200);
                                res.body.should.be.an.Array;
                                res.body.should.have.length(4);
                                res.body[3].should.be.an.Object;
                                res.body[3].should.have.properties(
                                    'amount', 'description');
                                done();
                    });
                });
        });
    });

    describe('PUT /api/atm/1', function () {

        it('updates the serviceFee property', function (done) {
            request(app)
                .put('/api/atm/1')
                .send({ serviceFee: 10 })
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.body.should.have.property('msg');

                    // once the property has been updated via a PUT request,
                    // need to verify the property has changed by doing another
                    // GET request for that item.
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
                        });
                });
        });
    });

    describe('DELETE /api/atm/3', function () {

        it('responds with json and a status of 200', function (done) {
            request(app)
                .get('/api/atm/3')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('deletes the record with id of 3', function (done) {
            request(app)
                .delete('/api/atm/3')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.body.should.have.property('msg');

                    // once the DELETE request has been made, need to verify
                    // that the length of the data array is decreased by one.
                    // this is done with a GET request for all the items.
                    request(app)
                        .get('/api/atm')
                            .set('Accept', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
                                should.not.exist(err);
                                res.status.should.equal(200);
                                res.body.should.be.an.Array;
                                res.body.should.have.length(3);
                                done();
                            });
                });
        });
    });
});
