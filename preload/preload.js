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
  var title = 'Starting a Church Site';
  var starting = {title: title,
                  content: fs.readFileSync('./preload/posts/starting-a-church-site.md', 'utf8'),
                  created: new Date(2010, 9, 27, 12, 54, 24),
                  tags: ['cakephp', 'drupal', 'mcac', 'wordpress'],
                  type: 'post',
                  slug: slugs(title)};

  title = 'What\'s Next for Montreal-CAC.org?';
  var next = {title: title,
              content: fs.readFileSync('./preload/posts/whats-next-for-mcac.md', 'utf8'),
              created: new Date(2010, 9, 27, 22, 13, 5),
              tags: ['churchie', 'mcac'],
              type: 'post',
              slug: slugs(title)};

  title = 'Amos Chan, Software Developer.';
  var about = {title: title,
               content: fs.readFileSync('./preload/posts/about.md', 'utf8'),
               created: new Date(2013, 0, 16, 10, 21, 2),
               tags: ['about'],
               type: 'page',
               slug: 'about'};

  title = 'Cuploadify: The CakePHP plugin for Uploadify';
  var cuploadify = {title: title,
                    content: fs.readFileSync('./preload/posts/cuploadify.md', 'utf8'),
                    created: new Date(2011, 0, 6, 10, 13, 3),
                    tags: ['cuploadify', 'cakephp'],
                    type: 'post',
                    slug: 'using-uploadify-in-cakephp'};

  title = '[ALPHA] Retrieve Bible passages with the Bible plugin for CakePHP (ESV)';
  var bible = {title: title,
               content: fs.readFileSync('./preload/posts/esv.md', 'utf8'),
               created: new Date(2011, 2, 6, 13, 58, 34),
               tags: ['bible', 'cakephp'],
               type: 'post',
               slug: slugs(title)};

  title = 'Loading CakePHP Helpers, Components and Behaviors on the fly';
  var fly = {title: title,
             content: fs.readFileSync('./preload/posts/fly.md', 'utf8'),
             created: new Date(2011, 3, 8, 12, 44, 25),
             tags: ['cakephp'],
             type: 'post',
             slug: slugs(title)};

  title = 'DidGomezScore: PHP vs Node.js Page Load Comparisons';
  var dgs = {title: title,
             content: fs.readFileSync('./preload/posts/dgs.md', 'utf8'),
             created: new Date(2012, 8, 5, 14, 22, 33),
             tags: ['nodejs', 'php'],
             type: 'post',
             slug: slugs(title)};

  console.log('populate default users');
  db.collection('posts', function(err, collection) {
    console.log('clearing posts collection...');
    collection.remove({}, function(err, results) {
      if (!err) {
        collection.insert(starting, function (err, result) {
          if (err) {
            console.log('error occurred trying to add post.');
          } else {
            console.log('post added.');
          }
        });
        collection.insert(next, function (err, result) {
          if (err) {
            console.log('error occurred trying to add post.');
          } else {
            console.log('post added.');
          }
        });
        collection.insert(cuploadify, function (err, result) {
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
        collection.insert(bible, function (err, result) {
          if (err) {
            console.log('error occurred trying to add post.');
          } else {
            console.log('post added.');
          }
        });
        collection.insert(fly, function (err, result) {
          if (err) {
            console.log('error occurred trying to add post.');
          } else {
            console.log('post added.');
          }
        });
        collection.insert(dgs, function (err, result) {
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
