/*global module:false, require:false */
/**!
 * Gruntfile
 * Follow README.md to get started
 */
module.exports = function(grunt) {

    // Load all grunt tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        publicPath: 'path/to/public/directory',

        less: {
            dist: {
                files: {
                    '<%= publicPath %>/css/site.css' : '<%= publicPath %>/css/less/site.less'
                }
            }
        },

        jshint: {
            files: [
              'Gruntfile.js',
              '<%= concat.app.src %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        concat: {
            options: {
                separator: ';',
                banner: '/*! <%= pkg.description %> - <%= pkg.author %> - Built <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
              src: [
                '<%= publicPath %>/js/util.js',
                '<%= publicPath %>/js/modules/**/*.js',
                '<%= publicPath %>/js/app.js'
              ],
              dest: '<%= publicPath %>/js/build/app.js'
            },
        },

        uglify: {
            app: {
                files: {
                    '<%= publicPath %>/js/build/app.min.js': [ '<%= concat.dist.dest %>' ]
                }
            }
        },

        watch: {
            lint: {
                files: '<%= jshint.files %>',
                tasks: [ 'build:js' ]
            },
            less: {
                files: ['<%= publicPath %>/css/less/site.less', '<%= publicPath %>/css/less/**/**/*.less'],
                tasks: ['less']
            }
        },


    });

    // Register tasks
    grunt.registerTask('lint', [
        'jshint'
    ]);
    grunt.registerTask('build:js', [
        'jshint',
        'concat'
    ]);
    grunt.registerTask('build', [
        'less',
        'build:js'
    ]);
    grunt.registerTask('default', [
        'build'
    ]);

};
