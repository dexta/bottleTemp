module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      devjs: {
        src: [
              'src/js/libs/jquery.js',
              'src/js/libs/handlebars.js','src/js/libs/bootstrap.js',
              'src/js/data.js','src/js/logic.js'
              ],
        dest: 'dev/js/globlibs.min.js'
      },
      devcss: {
        src: ['src/css/libs/bootstrap.css','src/css/libs/font-awesome.css','src/css/styles.css'],
        dest: 'dev/css/globstyles.min.css'
      }
    },

    includereplace: {
      dist: {
          options: {
              includesDir: 'src/templates/components'
          },
          files: [{
                        src: 'src/templates/index.html',
                        // cwd: '<%= dir.source_resources %>',
                        dest: 'dev/index.html',
                        expand: false
                    }]
        }
      },

    copy: {
      setup: {
        files: [
          {expand:true,flatten: true,src:"node_modules/jquery/dist/jquery.js",dest:"src/js/libs/"},
          {expand:true,flatten: true,src:"node_modules/bootstrap/dist/js/bootstrap.js",dest:"src/js/libs/"},
          {expand:true,flatten: true,src:"node_modules/handlebars/dist/handlebars.js",dest:"src/js/libs/"},
          {expand:true,flatten: true,src:"node_modules/bootstrap/dist/css/bootstrap.css",dest:"src/css/libs/"},
          {expand:true,flatten: true,src:"node_modules/font-awesome/css/font-awesome.css",dest:"src/css/libs/"}
        ]
      },
      dev: {
        files: [
          {expand:true,flatten: true,src:["node_modules/bootstrap/dist/fonts/*","node_modules/font-awesome/fonts/*"],dest:"dev/fonts/"},
          {src:'src/favicon.ico',dest:'dev/favicon.ico'}
        ]
      },
      build: {
        files: [
          {expand:true,flatten:true,src:'dev/fonts/*',dest:'dist/fonts/'},
          {src:'dev/index.html',dest:'dist/index.html'},
          {src:'src/favicon.ico',dest:'dev/favicon.ico'}
        ]
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js'],
      options: {
        globals: {
          jQuery: true
        },
        reporter: require('jshint-stylish')
      }
    },

    uglify: {
     options: {
        mangle: {
          except: ['jQuery']
        }
      },
      dist: {
        files: {
          'dist/js/globlibs.min.js': ['dev/js/globlibs.min.js']
        }
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'dev/css/',
        src: ['*.css'],
        dest: 'dist/css/'
        // ext: '.min.css'
      }
    },

    watch: {
      files: ['src/**/*.*'],
      tasks: ['jshint','concat','includereplace']
    },
    clean: {
      dev: ['dev/js','dev/css','dev/fonts'],
      build: ['dist/']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');


  grunt.registerTask('setup', ['copy:setup','copy:fonts']);

  grunt.registerTask('dev', ['jshint', 'clean:dev', 'includereplace', 'concat', 'copy:dev']);

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('build', ['jshint', 'clean:build', 'includereplace', 'copy:dev', 'concat', 'copy:build', 'uglify', 'cssmin']);

};