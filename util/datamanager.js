// util/datamanager.js

// simple utility module which acts as a datamanager to read/write/delete
// data files from the project.  This is really just a wrapper module for
// the 'fs' module, utilizing both async and sync methods.  Other than the
// surface functionality, the motivation of this module was to get a deeper
// understanding of callbacks and implementing node modules.

// Once the data store functionality is transitioned to a mongodb database,
// this utility module will no longer be required.

var fs = require('fs');

exports.getDataFromFile = function(file) {
    if (fs.existsSync(file)) {
        var data = fs.readFileSync(file, 'utf8');
        return data;
    } else {
        console.log('requested file does not exist.');
        return;
    }
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
    });
};
