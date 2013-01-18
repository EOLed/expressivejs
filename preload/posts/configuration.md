While developing [expressive.js](http://github.com/achan/expressivejs), I ran into an issue where my development's [express server](http://expressjs.com) was running on port 3000 but my production environment's server was running on port 4000. For that reason, among others, I needed to create a way to allow my application to have some custom configuration. I ended up settling with the [following solution](https://github.com/achan/expressivejs/issues/2).

The idea is that I have two configuration json files in /config. `config.json` is for server-specific configuration. For example, the port that expressjs listens on, or my redis username and password, or my Twitter api token. `siteconfig.json` is for public-facing configuration. For example, the site's name or custom footer content.

My `config.js` file will read the two JSON files, parse them and export them as `config`.

I'll load my config into my app with `var config = require('./config/config');` and my configuration will be accessible via `config` and my site configuration will be accessed via `config.site`.

I also pass my site configuration to my views with [app.locals](http://expressjs.com/api.html#app.locals):

    app.configure(function() {
      ...
      app.locals.config = config.site;
    });

Coupled along with the fact that my `.gitignore` ignores all files in /config, the public repository will not contain any sensitive/user-specific information.
