module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        jshint: {
            files: ['Gruntfile.js', 'server.js'],
            tests: 'test/*.js',
            controllers: 'controllers/*.js',
            models: 'models/*.js',
            routes: 'routes/*.js',
            util: 'util/*.js',
            config: 'config/*.js',

            options: {
                node: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                indent: 4,
                latedef: 'nofunc',
                validthis: true,

                globals: {
                    app: true,
                    angular: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};
