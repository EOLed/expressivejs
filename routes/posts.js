var mongo = require('mongodb'), slugs = require('slugs');
var Server = mongo.Server,
    Db = mongo.Db,
    Bson = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('expressivedb', server, { w: 1});

db.open(function(err, db) {
  if (!err) {
    console.log("Connected to 'expressive' database");
    db.collection('posts', {safe: true}, function(err, collection) {
      if (err) {
        console.log("The 'posts' collection doesn't exist. Initializing collection...");
      }
    });
  } else {
    console.log("error: " + err);
  }
});

exports.index = function(req, res) {
};

exports.view = function(req, res) {
  var slug = req.params.slug;
  var year = req.params.year;
  var month = req.params.month;
  var day = req.params.day;
  var createDate = new Date(year, month - 1, day);

  db.collection('posts', function(err, collection) {
    collection.findOne({'slug': req.params.slug, 'created': {'$gte': createDate, '$lte': new Date(year, month - 1, day + 1)}}, function(err, item) {
      console.log('post found: ' + JSON.stringify(item));
      res.render('posts/view', {post: item});
    });
  });
};

exports.add = function(req, res) {
  res.render('posts/add');
};

exports.newPost = function(req, res) {
  var post = req.body.post;
  post.slug = slugs(post.title);
  post.created = new Date();
  console.log('saving post: ' + JSON.stringify(post));
  db.collection('posts', function(err, collection) {
    collection.insert(post, {safe: true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
      }
    });
  });

  res.render('posts/add');
};
