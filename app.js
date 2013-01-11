var express = require('express'), 
    posts = require('./routes/posts.js'), 
    path = require('path'),
    moment = require('moment'),
    marked = require('marked');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.locals.fromNow = function( d ) { return moment(d).fromNow(); };
  app.locals.marked = function( md ) { return marked(md); };
});

app.get('/', posts.index);
app.get('/:year/:month/:day/:slug', posts.view);
app.get('/posts/add', posts.add);
app.post('/posts/add', posts.newPost);

app.listen(3000);
console.log('expressive listening on port 3000...');
