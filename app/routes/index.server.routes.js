
module.exports = function(app) {

    app.get('/', function(req, res) {
        res.json({msg: 'Very well...! welcome to the index page!'});
    });
};
