var express = require('express'), blog = require('./routes/blog.js'), path = require('path');
var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', blog.index);
app.get('/:year/:month/:day/:slug', blog.view);
app.get('/posts/add', blog.add);
app.post('/posts/add', blog.newPost);

app.listen(3000);
console.log('expressif listening on port 3000...');
