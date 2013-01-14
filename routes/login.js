var mongo = require('mongodb'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt');

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

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('local strategy login...');
    bcrypt.hash(password, 8, function(err, hash) {
      if (err) {
        console.log('couldn\'t login: bcrypt hashing error.');
        done(null, false, {message: 'A system error occurred. Could not login.'});
        return;
      }

      db.collection('users', function(err, collection) {
        collection.findOne({username: username, password: password}, function(err, item) {
          if (err) {
            console.log('could not login for ' + username + ': incorrect username/password');
            done(null, false, {message: 'Incorrect username/password.'});
          } else {
            console.log('successfully logged in: ' + username);
            done(null, item);
          }
        });
      });
    });
  }
));

exports.index = function(req, res) {
  res.render('login');
};

exports.login = function(req, res) {
  console.log('attempting to login via passport...');
  passport.authenticate('local', {successRedirect: '/',
                                  failureRedirect: '/login',
                                  failureFlash: true});
}

exports.initialize = function() {
  return passport.initialize();
}
