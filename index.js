var express = require('express');
var app = express();
var serveIndex = require('serve-index');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/' + 'ninja.html');
});

app.get('/dl/:filename', function(req, res){
  res.download(__dirname + '/dl/' + req.params.filename, req.params.filename, function(err){
    if(err){
      console.warn(err);
    } else {
      console.log('someone wanted to download', req.params.filename);
    }
  });
});

app.use(express.static('public'));
app.use('/dl', serveIndex('dl', {'icons': true}));

var server = app.listen(80);

app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/public/' + '404.html');
});
