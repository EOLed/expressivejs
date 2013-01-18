var request = require('request'), redis = require('redis');

exports.publicActivity = function(req, res) {
  var redisClient = redis.createClient();
  
  redisClient.on('connect', function() {
    redisClient.get('github:commits', function(err, reply) {
      redisClient.quit();
      res.render('github/activity', {activities: JSON.parse(reply), title: 'My Commit Stream'});
    });
  });
  
  redisClient.on('error', function(err) {
    redisClient.quit();
    res.render('github/activity', {activities: [], title: 'My Commit Stream'});
  });
}
