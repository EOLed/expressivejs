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
  } else {
    console.log("error: " + err);
  }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
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
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  done(null, {username: username});
});

exports.index = function(req, res) {
  res.render('login');
};

exports.login = function(req, res, next) {
  console.log('attempting to login via passport...');
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) return res.redirect('/login');
    return res.redirect('/');
  })(req, res, next);
}

exports.session = function() {
  return passport.session();
}

exports.initialize = function() {
  return passport.initialize();
}

exports.initialize = function() {
  return passport.initialize();
}

exports.requiresLogin = function(res, req, next) {
  next();
}
