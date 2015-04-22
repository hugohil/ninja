var express = require('express');
var app = express();
var serveIndex = require('serve-index');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/' + 'ninja.html');
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
});

app.use(express.static('public'));
app.use('/dl', serveIndex('dl', {'icons': true}));

app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/public/' + '404.html');
});
