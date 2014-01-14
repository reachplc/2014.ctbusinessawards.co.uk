module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')

  //  Build Site

   ,watch: {
      files: ['src/**/*']
     ,tasks: ['dev']
     ,options: {
        livereload: true
      }
    }

   ,express: {
      dev: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases: '_site'
        }
      }
    }

   ,shell: {
      jekyll_dev: {
        command: 'jekyll build'
      },
      jekyll_deploy: {
        command: 'jekyll build --destination 2014'
      }
    }

   ,clean: {
      files: ['src/_site']
    }

  // Compile

   ,less: {
      development: {
        options: {
        paths: ['html/static/css']
        }
       ,files: {
        'arc/static/css/global.css': ['src/_includes/less/global.less']
        }
      }
    }

  // Validate

   ,htmlhint: {
      options: {
        'tag-pair': true,
        'tagname-lowercase': true,
        'attr-lowercase': true,
        'attr-value-double-quotes': true,
        'doctype-first': true,
        'spec-char-escape': true,
        'id-unique': true,
        'head-script-disabled': true,
        'style-disabled': true,
        'src-not-empty': true,
        'img-alt-require': true
      },
      src: ['_site/**/*.html']

    }

   ,csslint: {
      options: {
        'adjoining-classes': false,
        'box-model': false,
        'box-sizing': false,
        'regex-selectors': false,
        'universal-selector': false,
        'font-sizes': false  //  Until CSSLint has the option to set an ammount
      },
      src: ['_site/static/css/*.css']
    }

   ,jshint: {
      options: {
        browser: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        indent: 2,
        laxbreak: true,
        laxcomma: true,
        quotmark: 'single',
        trailing: true,
        undef: true,
        globals: {
          console: true,
          module: true,
          jQuery: true
        }
      },
      src: ['gruntfile.js', '_sites/static/js/*.js']
    }

  // Optimise

  ,imagemin: {
      options: {
        optimizationLevel: 3
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src/static/gui',
          src: ['**/*.{png,jpg,gif}'],
          dest: '_site/static/gui'
        },
        {
          expand: true,
          cwd: 'src/static/media',
          src: ['**/*.{png,jpg,gif}'],
          dest: '_site/static/media'
        }]
      }
    }

  // Deploy

  ,'gh-pages': {
    options: {
      base: '_site',
      branch: 'gh-pages',
      repo: 'https://example.com/other/repo.git',
      push: true
    },
    src: '**/*'
  }

  });

  // Tasks

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Options

  grunt.registerTask('default', ['dev', 'serve']);
  grunt.registerTask('test', ['htmlhint', 'csslint', 'jshint']);
  grunt.registerTask('optim', ['imagemin']);
  grunt.registerTask('dev', ['clean', 'less', 'shell:jekyll_dev']);
  grunt.registerTask('serve', ['express', 'watch']);
  grunt.registerTask('stage', ['dev', 'optim']);

};