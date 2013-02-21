var mongo = require('mongodb'),
    bcrypt = require('bcrypt');

var Server = mongo.Server,
    Db = mongo.Db,
    Bson = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('expressivedb', server, { w: 1});

db.open(function(err, db) {
  if (!err) {
    console.log("Connected to 'expressive' database");
  } else {
    console.log("error: " + err);
  }
});

exports.localStrategy = function(username, password, done) {
  console.log('local strategy login...');

  db.collection('users', function(err, collection) {
    collection.findOne({username: username}, function(err, user) {
      if (err) {
        console.log('error occured while querying for user: ' + username);
        return done(null, false);
      } else {
        if (user) {
          console.log('user found: ' + user.username + ' now comparing pw.');
          bcrypt.compare(password, user.password, function(err, res) {
            if (err) {
              console.log('couldn\'t login: bcrypt hashing error.');
              return done(err);
            }

            if (!res) {
              console.log('incorrect password...');
              return done(null, false);
            }

            console.log('password matches!');
            return done(null, user);
          });
        } else {
          console.log('no user found: ' + username);
          return done(null, false);
        }
      }
    });
  });
}

exports.index = function(req, res) {
  res.render('login');
};

exports.login = function(req, res) {
  res.render('login');
}

exports.requiresLogin = function(req, res, next) {
  console.log('checking for logged user... ' + JSON.stringify(req.user));
  if (!req.user) {
    console.log('rendering login page instead.');
    res.render('login');
  } else { 
    console.log('logged user found. continuing chain...');
    next();
  }
}
