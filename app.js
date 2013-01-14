var express = require('express'), 
    posts = require('./routes/posts.js'), 
    path = require('path'),
    moment = require('moment'),
    marked = require('marked'),
    preload = require('./preload/preload.js'),
    login = require('./routes/login.js');

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
  app.use(login.initialize());
  app.use(login.session());
  app.use(app.router);

  app.locals.fromNow = function(d) { return moment(d).fromNow(); };
  app.locals.url = function(post) { return '/' + moment(post.created).format('YYYY/MM/DD') + '/' + post.slug; };
  app.locals.marked = function(md) { return marked(md); };

  preload.preload();
});

app.all('/admin(/*)?', login.requiresLogin);

app.get('/login', function(req, res) { res.render('login'); });
app.post('/login', login.login);

app.get('/', posts.index);
app.get('/:year/:month/:day/:slug', posts.view);
app.get('/admin/posts/add', posts.add);
app.post('/admin/posts/add', posts.newPost);

app.listen(3000);
console.log('expressive listening on port 3000...');
