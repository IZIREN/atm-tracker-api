// returns a separate object based on whether the environment
// is 'test' or 'development'.  The returned object defines the
// input and output files to read/write the data.
module.exports = function () {
    switch(process.env.NODE_ENV) {
        
        // for the 'test' environment, we want different input
        // and output files so the input file is not changed
        // during the test.  This will ensure that we read
        // the same input file for each run of the test suite.
        // If the running the test suite changed the input files,
        // then each subsequent test run would fail since things
        // are not what is expected
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
        // TODO: add default case
    }
};