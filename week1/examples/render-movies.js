var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var engines = require('consolidate'); //for template engines
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var express = require('express');
var app = express(); //Create an app

//Add app use Engines
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {
  assert.equal(null, err); //If err != null throw exception
  console.log('Conected to Server DB');
  app.get('/', function(req, res) {
    db.collection('movies').find({}).toArray(function(err, docs) {
      res.render('movies', { movies: docs });
    });
  });

  //Default 404 error
  app.use(function(req, res) {
    res.sendStatus(404);
  });

  //run server
  app.listen(5005, function() {
    console.log('Server listen on ' + this.address().port);
  });
});
