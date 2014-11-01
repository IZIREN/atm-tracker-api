var app = require('../server');

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
    console.log('server listening on port ' + server.address().port);
});
