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

        // For a SilverStripe site this might be web/themes/themename/static'
        // No trailing slash
        publicPath: 'public',

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
            // App JS
            app: {
              src: [
                '<%= publicPath %>/js/util.js',
                '<%= publicPath %>/js/modules/**/*.js',
                '<%= publicPath %>/js/app.js'
              ],
              dest: '<%= publicPath %>/js/build/app.js'
            },
            // jQuery plugins only
            plugins: {
                src: ['<%= publicPath %>/js/vendor/jquery/plugins/**/*.js'],
                dest: '<%= publicPath %>/js/build/plugins.js'
            },
            // Vendor code (e.g., underscore.js, webfont.js etc.)
            vendor: {
                // Excluding Modernizr
                src: [
                    '<%= publicPath %>/js/vendor/underscore-1.4.4.js'
                ],
                dest: '<%= publicPath %>/js/build/vendor.js'
            }
        },

        uglify: {
            app: {
                files: {
                    '<%= publicPath %>/js/build/min/app.min.js': [ '<%= concat.vendor.dest %>',  '<%= concat.plugins.dest %>', '<%= concat.app.dest %>'  ]
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
    grunt.registerTask('build:production', [
        'build',
        'uglify'
    ]);
    grunt.registerTask('default', [
        'build'
    ]);

};
