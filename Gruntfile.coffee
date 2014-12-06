module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    coffee:
      compile:
        options:
          join: true
        files:
          'build/<%= pkg.name %>.js': [
            'src/start.coffee'
          ]

    uglify:
      build:
        src: 'build/<%= pkg.name %>.js'
        dest: 'build/<%= pkg.name %>.min.js'

    watch:
      coffee:
        files: ['src/**/*.coffee']
        tasks: ['coffee', 'uglify']
      gruntfile:
        files: 'Gruntfile.coffee'
        options:
          reload: true

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', 'watch'