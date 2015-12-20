module.exports = function(grunt) {
  var folderRgx = new RegExp('^[^\\/?%*:|"<>\.\s]+$');
  
  grunt.loadNpmTasks('grunt-file-missing');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    fileMissing: {
      sjo: {
        options: {
          files: [process.env['HOME'] + '/.grunt-init',process.env['HOME'] + '/.grunt-init/sjo'],
          missing: function(file){
            var error = "The file " + file + " is missing!\n\n";
            error += "You need grunt-init to be installed globally:\n\n    npm install -g grunt-init\n\n\n";
            error += "Also install the SJO Spaces template:\n\n    git clone git@github.com:dianitica/grunt-init-sjo.git ~/.grunt-init/sjo\n\n";
            grunt.fail.fatal(error, 1);
          }
        }
      }
    },
    prompt: {
      new_app_dir: {
        options: {
          questions: [
            {
              config: 'mkdir.app.options.create',
              type: 'input',
              message: 'Name of app\'s folder',
              default: 'new-app',
              validate: function(value){ return folderRgx.test(value); },
              filter:  function(value){ return [value]; }
            }
          ]
        }
      },
    },
    mkdir: {
      app: {
        options: {
          mode: 0700,
          create: []
        },
      },
    }
  });

  // Default task(s).
  grunt.registerTask('default', function(){
    var message = "\n\nWelcome to SJO Spaces grunt tasks, run one of the following:\n\n";
    message += "    grunt new:app";
    grunt.log.writeln(message);
  });

  grunt.registerTask('shell_init', function(){
    var shell_conf = {
      init: {
        command: 'grunt-init sjo',
        options: {
            execOptions: {
                cwd: grunt.config.get('mkdir').app.options.create[0]
            }
        }
      }
    };

    grunt.config.set('shell', shell_conf);

    grunt.task.run('shell:init');
  });

  grunt.registerTask('new:app', ['fileMissing:sjo', 'prompt:new_app_dir', 'mkdir:app', 'shell_init']);

};