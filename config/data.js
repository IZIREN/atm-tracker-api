module.exports = function () {
    switch(process.env.NODE_ENV) {
        case 'test':
            return {
                inputFile: 'data/test-atmdb.json',
                outputFile: 'data/test-outputdb.json'
            };
        case 'development':
            return {
                inputFile: 'data/dev-atmdb.json',
                outputFile: 'data/dev-atmdb.json'
            };
    }
};