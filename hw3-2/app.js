var MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  data = require('./grades.js');

// console.log(data);

var removes = [];
var prev = { student: null };
MongoClient.connect('mongodb://localhost:27017/homework', function(err, db) {
  assert.equal(err, null);
  console.log('Successfully connected to MongoDB.');

  var cursor = db.collection('school').find();
  cursor.project({ student: 1, _id: 0, grade: 1 });
  cursor.sort({ grade: 1 });
  cursor.limit(2);
  cursor.skip(6);

  cursor.forEach(
    function(est) {
      console.log(est);
    },
    function(e) {
      db.close();
    }
  );

  //remove duplicates
  // cursor.sort({ student: 1 });
  // cursor.forEach(
  //   function(est) {
  //     if (prev.student == est.student) {
  //       console.log(est);
  //       removes.push(est._id);
  //     }
  //     prev = est;
  //   },
  //   function(e) {
  //     console.log('to remove', removes);
  //     var filter = { _id: { $in: removes } };
  //     db.collection('school').deleteMany(filter, function(err, res) {
  //       console.log(res.result);
  //       console.log(removes.length + ' documents removed.');
  //       return db.close();
  //     });
  //
  //     //db.close();
  //   }
  // );

  //TO insertMany
  // db.collection('school')
  // .insertMany(data, function(err, result) {
  //   console.log(err);
  // });
});
