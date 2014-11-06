var dm = require('../util/datamanager');

var data, json;
before(function() {
    data = dm.getDataFromFile('./data/data.json');
    json = JSON.parse(data);
});

describe('datamanager', function () {

    it('should read a file', function () {
        data.should.be.ok;
    });

    it('test data as an array with length 3', function() {
        json.should.be.an.Array;
        json.should.have.length(3);
    });

    it('first element of test data should have a cashAmount property', function() {
        json[0].should.have.property('cashAmount');
    });

    it('should write to a file');
});
