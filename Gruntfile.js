"use strict";

module.exports = function(grunt) {
  // require("load-grunt-tasks")(grunt);
   // grunt.loadNpmTasks("grunt-contrib-less");
   // grunt.loadNpmTasks("grunt-postcss");
   // grunt.loadNpmTasks("grunt-contrib-watch");
   // grunt.loadNpmTasks("grunt-browser-sync");
     require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "css/style.css": "less/style.less"
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: [
            "last 1 version",
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Opera versions",
            "last 2 Edge versions"
          ]}),
           require("css-mqpacker")({
                  sort: true
                  })
        ]
      },
      style: {
        src: "css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "css/style.min.css": ["css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
           expand: true,
           src: ["img/**/*.{png,jpg,gif}"]
         }]
       }
    },


    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "css/*.css"
          ]
        },
        options: {
          server: ".",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      files: ["less/**/*.less"],
      tasks: ["less", "postcss"],
      options: {
        spawn: false
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);

  grunt.registerTask("build", [
    "less",
    "postcss",
    "csso",
    "imagemin"

    ]

    );

};
