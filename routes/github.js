var request = require('request');

exports.publicActivity = function(req, res) {
  request('https://api.github.com/users/achan/events/public', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var activities = JSON.parse(body);
        activities.forEach(function(activity) {
          if (activity.type == 'PushEvent') {
            activity.payload.commits.forEach(function(commit) {
              console.log('commit message: ' + commit.message);
              console.log('sha: ' + commit.sha);
              console.log('commit message: ' + commit.message);
              console.log('commit date: ' + activity.created_at);
              console.log('url: ' + commit.url);
            });
          } else if (activity.type == 'ForkEvent') {
            console.log('forked project description: ' + activity.payload.forkee.description);
            console.log('forked project url: ' + activity.payload.forkee.html_url);
            console.log('forked project date: ' + activity.payload.forkee.created_at);
          } else if (activity.type == 'CreateEvent') {
            console.log('created repo: ' + activity.payload.description);
            console.log('create date: ' + activity.created_at);
            console.log('repo name: ' + activity.repo.name);
            console.log('repo url: ' + activity.repo.url);
          }
        });

        res.render('github/activity', {activities: activities});
      }
  });
}
