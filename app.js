var express = require('express'), 
    posts = require('./routes/posts.js'), 
    path = require('path'),
    moment = require('moment'),
    marked = require('marked'),
    preload = require('./preload/preload.js'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    login = require('./routes/login.js'),
    github = require('./routes/github.js'),
    request = require('request'),
    config = require('./config/config.js'),
    hl = require("highlight").Highlight;

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
  app.use(express.session({secret: config.web.sessionSecret}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

  marked.setOptions({
    highlight: function(code, lang) {
      return hl(code);
    }
  });

  posts.config = config;

  app.locals.fromNow = function(d) { return moment(d).fromNow(); };
  app.locals.url = function(post) { return '/' + moment(post.created).format('YYYY/MM/DD') + '/' + post.slug; };
  app.locals.marked = function(md) { return marked(md); };
  app.locals.config = config.site;

  preload.preload();
});

passport.use(new LocalStrategy(login.localStrategy));

passport.serializeUser(function(user, done) {
  console.log('serializing user: ' + JSON.stringify(user));
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  console.log('deserializing user: ' + username);
  done(null, {username: username});
});

app.all('/admin(/*)?', login.requiresLogin);

app.get('/login', function(req, res) { res.render('login'); });
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), login.login);

app.get('/', posts.index);
app.get('/:year/:month/:day/:slug', posts.view);
app.get('/admin/posts/add', posts.add);
app.post('/admin/posts/add', posts.newPost);

app.get('/tags', posts.tags);
app.get('/about', posts.about);
app.get('/commits', github.publicActivity);

app.listen(config.web.port, function(){
  console.log("Expressive listening on port " + config.web.port);
  setInterval(function() {
    var url = config.web.github.url;
    var redis = require('redis');
    var redisClient = redis.createClient();

    redisClient.on('connect', function() {
      request(url, function (error, response, body) {
        redisClient.set('github:commits', body, redis.print);
        redisClient.quit(function(err, res) {
          console.log('closing redis client.');
        });
      });
    });

    redisClient.on('error', function (err) {
      console.error('Error occurred trying to retrieve github activity: ' + err);
    });
  }, config.web.github.intervalInMillis);
});

