var request = require('request');

exports.publicActivity = function(req, res) {
  request('https://api.github.com/users/achan/events/public', function(error, response, body) {
      console.log(JSON.stringify(body));
      if (!error && response.statusCode == 200) {
        res.render('github/activity', {activities: JSON.parse(body)});
      }
  });
}
