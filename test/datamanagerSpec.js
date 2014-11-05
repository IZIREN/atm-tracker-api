var dm = require('../util/datamanager');

describe('datamanager', function () {
    var data = dm.getDataFromFile('./data/data.json');
    it('should read a file', function () {
        data.should.be.ok;
    });
});
