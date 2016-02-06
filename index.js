var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
