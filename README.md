ExpressiveJS: The ExpressJS Blogging Engine
===========================================

ExpressiveJS is a blogging engine that runs on ExpressJS, MongoDB and Redis. It was written with
the goal of being lightweight and to serve up blog posts snapily. This repo is still in progress
and is not expected to be stable until milestone 1.0.0 is completed.

Requirements
============

- Node.js and npm
- Mongo DB
- Redis (Mandatory for now, but planned to be optional. It's currently only used to cache
GitHub activity.)

Installation
============

- Configure ExpressiveJS by moving the `/config/*.json.example` files to `/config/*.json`
and setting the appropriate values.
- start MongoDB and Redis
- `npm install expressive && expressive`
- Go to `<your domain>/posts/add` and write some posts!

Acknowledgements
================

[Font Awesome](http://fortawesome.github.com/Font-Awesome) by Dave Gandy

License
=======

Copyright (C) 2013 Amos Chan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
