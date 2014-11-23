// for the 'test' environment, we want different input
// and output files so the input file is not changed
// during the test.  This will ensure that we read
// the same input file for each run of the test suite.
// If the running the test suite changed the input files,
// then each subsequent test run would fail since things
// are not what is expected
module.exports = {
    
    inputFile: './app/data/test-atmdb.json',
    outputFile: './app/data/test-outputdb.json'
};
