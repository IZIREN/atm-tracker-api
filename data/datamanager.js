// data.js
var fs = require('fs');

var getDataFromFile = function(file, callback) {

    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        callback(data);
    });
};

var writeDataToFile = function(file, data) {
    fs.writeFile(file, JSON.stringify(data, null, 4), 'utf8', function(err) {
        if (err) {
            throw err;
        }
        console.log('json saved to ' + file);
    });
};

exports.getDataFromFile = getDataFromFile;
exports.writeDataToFile = writeDataToFile;