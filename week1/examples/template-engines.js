var engines = require('consolidate'); //for template engines

var express = require('express');
var app = express(); //Create an app

//Add app use Engines
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  res.render('hello', { name: 'Gerardo' });
});

//Default 404 error
app.use(function(req, res) {
  res.sendStatus(404);
});
app.listen(5005, function() {
  console.log('Server listen on ' + this.address().port);
});
