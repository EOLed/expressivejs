In early 2010, I decided that Montreal-CAC.org was more than due for a refresh. It’s been more than 5 years since the current version was pushed out, which means that it’s pretty much irrelevant at this point.

Well, between switching jobs, moving out and getting married, we’re closing in on the end of the year, and there’s been little progress.

What I have done is scrapped two different designs for the new site. I’ve also created a third layout, which looks great now, but will probably face a similar fate as the previous two before it’s release date.

One of the tougher decisions I’ve made was to not use Drupal or WordPress. Don’t get me wrong, I absolutely feel that those are good tools for creating church sites… and if one were thinking of creating a church site, I would definitely recommend checking out those two solutions first before deciding to build your own. If you can fit your site within those frameworks, their community’s plugins will help you tremendously. Unfortunately, I just didn’t see the features I wanted to implement for the new site as being easily integrated into Drupal or WordPress.

In the end, I felt most comfortable with building this site using the CakePHP framework. I’m aware of Drake, the CakePHP module for Drupal, but at this point, it just seems to bloated for what I’m trying to do.

In an attempt to reuse as much code as possible, I’m going to try and make as many generic CakePHP plugins as possible. For example, the management of Users, Groups and Roles will be part of it’s own separate project called the URG plugin. Ideally this plugin will be able to be reused in my future CakePHP projects.
