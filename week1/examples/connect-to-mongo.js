var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {
  assert.equal(null, err); //If err != null throw exception
  console.log('Conected to Server DB');
  db.collection('movies').find({}).toArray(function(err, docs) {
    docs.forEach(function(doc) {
      console.log(doc); //Print documents
    });
    db.close();
  });
});
