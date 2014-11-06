// util/datamanager.js

var fs = require('fs');

exports.getDataFromFile = function(file) {
    var data = fs.readFileSync(file, 'utf8');

    return data;
};

exports.writeDataToFile = function(file, data) {
    fs.writeFile(file, JSON.stringify(data, null, 4), 'utf8', function(err) {
        if (err) {
            throw err;
        }
    });
};

exports.removeFile = function (file) {
    fs.unlink(file, function (err) {
        if (err) {
            throw err;
        }
    })
}
