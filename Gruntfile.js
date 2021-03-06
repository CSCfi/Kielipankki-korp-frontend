'use strict';
// var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  // // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  // try {
  //   yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  // } catch (e) {}

  grunt.initConfig({
    // yeoman: yeomanConfig,
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
    watch: {
      //bower: {
      //  files: ['bower.json'],
      //  tasks: ['bowerInstall']
      //},
      pug : {
        files : ["<%= yeoman.app %>/index.pug", "<%= yeoman.app %>/{includes,views}/*.pug"],
        tasks : ['pug:compile']
      },
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['newer:coffee:dist']
      },
      coffeeTest: {
        files: ['test/karma/spec/{,*/}*.coffee'],
        tasks: ['newer:coffee:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
          '{.tmp,<%= yeoman.app %>}/modes/{,*/}*.js',
          '{.tmp,<%= yeoman.app %>}/config.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
        // tasks: ['livereload']
      }
    },
    shell: {
        postBuild: {
            command: 'sh post_build.sh'
        }
    },
    protractor: {
      options: {
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        chromeOnly : true,
        args: {
          // Arguments passed to the command
        }
      },
      test: {
        options: {
          configFile: "test/e2e/conf_e2e.js", // Target-specific config file
          args: {
            // rootElement: 'div'
          } // Target-specific arguments
        }
      }
    },

    connect: {
      options: {
          port: 9000,
          // change this to '0.0.0.0' to access the server from outside
          hostname: '0.0.0.0',
          livereload: 35729,
          base: [
          //   '.tmp',
            // 'test',
          //   '<%= yeoman.app %>'
          "dist"
          ]
      },
      livereload: {
          options: {
            open: false,
            base: [
              '.tmp',
              '<%= yeoman.app %>'
            ]
          }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      e2e : {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        dist: {
          options: {
            base: '<%= yeoman.dist %>'
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.livereload.options.port %>'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    clean: {
      dist: {
        options : {
          force : true
        },
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>'
            // '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: {
        options : {
          force : true
        },
        files: {
          src: [
          '.tmp',
          "app/scripts/bin/**/*",
          "app/index.html",
          "app/styles/styles.css",
          "app/styles/bootstrap.css"
          ]
        }
      },
      e2e: {
        options : {
          force : true
        },
        files: {
          src: [
            'test/e2e/bin'
          ]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles/',
          src: '{,*/}*.css',
          dest: 'app/styles/'
        }]
      }
    },
    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: '<%= yeoman.app %>/'
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: '<%= yeoman.app %>/components/'
      }
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: '..'
      },
      dist: {
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: ['**/*.coffee'],
          // dest: '.tmp/scripts',
          dest: '<%= yeoman.app %>/scripts/bin',
          ext: '.js'
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/karma/spec',
          src: '*.coffee',
          dest: 'test/karma/bin',
          ext: '.js'
        },
        {
          expand: true,
          cwd: 'test/e2e/spec',
          src: '*.coffee',
          dest: 'test/e2e/bin',
          ext: '.js'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: ['.tmp/styles', '<%= yeoman.app %>/styles'],
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: ['<%= yeoman.app %>/styles/fonts','<%= yeoman.app %>/styles/fonts', "<%= yeoman.app %>/components/font-awesome/fonts"],
        importPath: '<%= yeoman.app %>/components',
        httpImagesPath: 'images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: 'styles/fonts',
        relativeAssets: true,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: false
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= yeoman.dist %>/styles/fonts/*',
            '!<%= yeoman.dist %>/scripts/statistics_worker.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      // html: ['<%= yeoman.dist %>/{,*/}*.html'],
      html: ['<%= yeoman.dist %>/*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>'],

        // assetsDirs: ['<%= yeoman.dist %>/styles', '<%= yeoman.dist %>/styles/fonts', '"<%= yeoman.dist %>/components/font-awesome/fonts"' ],
        // assetsDirs: ['<%= yeoman.dist %>/styles'],
      }
    },
    cssmin: {
      options: {
        root: '<%= yeoman.app %>'
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['views/{,*/}*.html', 'markup/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: 'scripts.js',
          dest: '.tmp/concat/scripts'
          // expand: true,
          // cwd: '<%= yeoman.dist %>/scripts',
          // src: '*.js',
          // dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    copy: {
      dev : {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['components/font-awesome/fonts/*'],
          dest: '.tmp/fonts',
          flatten: true
        },
        {
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['components/jquery-ui/themes/smoothness/images/*'],
          dest: '.tmp/images',
          flatten: true
        }]
      },
      dist: {
        files: [
        {'<%= yeoman.dist %>/index.html': "<%= yeoman.app %>/index.html" },
        {
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['components/font-awesome/fonts/*'],
          dest: '<%= yeoman.dist %>/fonts',
          flatten: true
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'scripts/statistics_worker.js',
            '*.{ico,txt,js,xml}',
            '.htaccess',
            'components/jquery-ui/themes/smoothness/images/*',
            'components/SlickGrid/images/*',
            'translations/*',
            // 'markup/*',
            'modes/*',
            'img/*',
            'lib/**/*',
            'styles/**/*.{png,otf,gif}',
            'styles/styles.css',
            "components/font-awesome/fonts/*",
            'components/d3/d3.min.js',
            'components/rickshaw/rickshaw.min.js',
            'lib/jquery.tooltip.pack.js',
            'lib/leaflet-settings.js',
            'components/jquery-ui/themes/smoothness/jquery-ui.min.css',
            'components/geokorp/dist/data/places.json',
            'components/geokorp/dist/data/name_mapping.json',
            'components/leaflet/dist/images/layers.png'
          ]
        },
        {
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['components/jquery-ui/themes/smoothness/images/*'],
          dest: '<%= yeoman.dist %>/images',
          flatten: true
        },
        {
          cwd: '',
          dest: '<%= yeoman.dist %>/',
          src: ['LICENSE']

        }]
      } // removed from 0.8, not sure if we need
      // styles: {
      //   expand: true,
      //   cwd: '<%= yeoman.app %>/styles',
      //   dest: '.tmp/styles/',
      //   src: '{,*/}*.css'
      // }
    },
    concurrent: {
      server: [
        'newer:coffee:dist',
        'compass:server'
      ],
      test: [
        'newer:coffee:test',
        'newer:compass'
      ],
      dist: [
        'coffee:dist',
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'test/karma/karma.conf.js',
        singleRun: true
      }
    },
    pug: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true

        },
        files: [
          {'<%= yeoman.app %>/index.html': ["<%= yeoman.app %>/index.pug"]},
          {
            expand: true,
            cwd: 'app/views',
            src: '{,*/}*.pug',
            dest: 'app/views',
            ext: '.html'
          }
        ]
      }
    },
    svninfo: {

    },
    'string-replace': {
      dist: {
        files: {
          'dist/korp.yaml': 'korp.yaml'
        },
        options: {
          replacements: [{
            pattern: 'KORP-VERSION',
            replacement: grunt.file.readJSON("package.json").version
          },
          {
            pattern: 'SVN-REVISION',
            replacement: '<%= svninfo.rev %>'
          }]
        }
      }
    }
  });

  grunt.registerTask('release', function(target) {
    grunt.task.run([
     'build',
    ]);
    
    var noPostBuild = grunt.option('no-post-build');
    if(noPostBuild) {
      grunt.task.run([
        'svninfo',
        'string-replace:dist'
      ]);
    } else {
      grunt.task.run([
        'svninfo',
        'string-replace:dist',
        'shell:postBuild'
      ]);
    }
      
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        // 'build',
        'connect:dist:keepalive'
      ]);
    }

    grunt.task.run([
      'clean:server',
      //'bowerInstall',
      'pug',
      'concurrent:server',
      'copy:dev',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', function(target) {
    if(target === 'karma') {
      return grunt.task.run([
        'newer:coffee:dist',
        'newer:coffee:test',
        'karma'
      ]);
    } 
      
    grunt.task.run([
        'clean:server',
        "pug",
        'concurrent:test',
        'copy:dev',
        'concurrent:server',
        'autoprefixer'
    ]);
    
    if(target !== 'e2e') {
      grunt.task.run([
        'karma'
      ]);
    } 
    
    grunt.task.run([
      'connect:e2e',
      'protractor',
      'clean:e2e'
    ]);
    
  });

  grunt.registerTask('build', [
    'clean:dist',
    // 'bowerInstall',
    "pug",
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    // 'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    // 'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('default', ['build']);



};
