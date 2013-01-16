var mongo = require('mongodb'), slugs = require('slugs'), bcrypt = require('bcrypt'), fs = require('fs'), slugs = require('slugs');
var Server = mongo.Server;
var Db = mongo.Db;
var Bson = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var preloadId = 'init';

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

exports.preload = function() {
  db.collection('preloadrequests', function(err, collection) {
    collection.findOne({'id': preloadId}, function(err, item) {
      if (err) {
      } else {
        if (item == null) {
          console.log('preloading...');
          preload();
        } else {
          console.log('preload request [' + preloadId + '] already processed.');
        }
      }
    });
  });
}

function preload() {
  console.log('start preloading...');

  preloadUsers();
  preloadPosts();
}

function preloadUsers() {
  console.log('populate default users');
  db.collection('users', function(err, collection) {
    console.log('clearing users collection...');
    collection.remove({}, function(err, results) {
      if (!err) {
        console.log('hashing password...');
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash('password', salt, function(err, hash) {
            console.log('inserting achan with hash ' + hash + ' to users collection...');
            collection.insert({username: 'achan',
                               name: 'Amos Chan',
                               email: 'amos.chan+express@chapps.org',
                               joined: new Date(),
                               password: hash},
                              function (err, result) {
              if (err) {
                console.log('error occurred trying to add achan.');
              } else {
                console.log('achan added.');
              }
            });
          }); // end bcrypt
        });
      };
    });
  });
}

function preloadPosts() {
  var title = 'The Raspberry Pi Mini-Computer Has Sold More Than 1 Million Units';
  var rpi = {title: title,
             content: fs.readFileSync('./preload/posts/rpi.md', 'utf8'),
             created: new Date(new Date().getTime() - parseInt(Math.random() * 365 * 1000000)),
             tags: ['tech', 'raspberrypi'],
             slug: slugs(title)};

  title = "New cover of Orwell's '1984' blacks out 'George Orwell' and '1984'";
  var nineteenEightyFour = {title: title,
                            content: fs.readFileSync('./preload/posts/1984.md', 'utf8'),
                            created: new Date(new Date().getTime() - parseInt(Math.random() * 365 * 1000000)),
                            tags: ['books'],
                            slug: slugs(title)};

  title = 'Reasons to be Excited';
  var excited = {title: title,
                content: fs.readFileSync('./preload/posts/excited.md', 'utf8'),
                created: new Date(new Date().getTime() - parseInt(Math.random() * 365 * 1000000)),
                tags: ['tech', 'editorial'],
                slug: slugs(title)};

  title = 'Amos Chan, Software Developer';
  var about = {title: title,
                content: fs.readFileSync('./preload/posts/about.md', 'utf8'),
                created: new Date(new Date().getTime() - parseInt(Math.random() * 365 * 1000000)),
                tags: ['about'],
                slug: 'about'};

  console.log('populate default users');
  db.collection('posts', function(err, collection) {
    console.log('clearing posts collection...');
    collection.remove({}, function(err, results) {
      if (!err) {
        collection.insert(nineteenEightyFour, function (err, result) {
          if (err) {
            console.log('error occurred trying to add post.');
          } else {
            console.log('post added.');
          }
        });
        collection.insert(excited, function (err, result) {
          if (err) {
            console.log('error occurred trying to add post.');
          } else {
            console.log('post added.');
          }
        });
        collection.insert(rpi, function (err, result) {
          if (err) {
            console.log('error occurred trying to add post.');
          } else {
            console.log('post added.');
          }
        });
        collection.insert(about, function (err, result) {
          if (err) {
            console.log('error occurred trying to add post.');
          } else {
            console.log('post added.');
          }
        });
      }
    });
  });
}
