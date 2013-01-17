var fs = require('fs');

var config = JSON.parse(fs.readFileSync('./config/config.json'));
config.site = JSON.parse(fs.readFileSync('./config/siteconfig.json'));
module.exports = config;
