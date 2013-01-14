var express = require('express'), 
    posts = require('./routes/posts.js'), 
    path = require('path'),
    moment = require('moment'),
    marked = require('marked'),
    preload = require('./preload/preload.js'),
    bcrypt = require('bcrypt'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var app = express();

app.configure(function() {
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: 'temporarysecret'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

  app.locals.fromNow = function(d) { return moment(d).fromNow(); };
  app.locals.url = function(post) { return '/' + moment(post.created).format('YYYY/MM/DD') + '/' + post.slug; };
  app.locals.marked = function(md) { return marked(md); };

  preload.preload();
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
          console.log('user found: ' + username + ' now comparing pw.');
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

app.all('/admin(/*)?', function(req, res, next) { res.redirect('/login'); });

app.get('/login', function(req, res) { res.render('login'); });
app.post('/login',
         passport.authenticate('local', {failureRedirect: '/login'}),
         function(req, res) { res.redirect('/'); });

app.get('/', posts.index);
app.get('/:year/:month/:day/:slug', posts.view);
app.get('/admin/posts/add', posts.add);
app.post('/admin/posts/add', posts.newPost);

app.listen(3000);
console.log('expressive listening on port 3000...');
