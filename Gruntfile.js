/*jslint node: true*/
'use strict';

var path = require('path');

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['*.js', 'routes/*.js', 'stores/*.js', 'tests/**/*.js']
    },
    jasmine_node: {
      projectRoot: '.'
    },
    express: {
      custom: {
        options: {
          port: 3000,
          server: path.resolve('app')
        }
      }
    },
    shell: {
      mongo: {
        command: 'mongod --dbpath=./data/db --fork --logpath=./logs/mongod.log',
        options: {
          stdout: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['jshint', 'jasmine_node']);
  grunt.registerTask('t', ['jasmine_node']);
  grunt.registerTask('s', ['shell:mongo', 'express', 'express-keepalive']);
};
