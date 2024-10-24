const sass = require('sass');
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: { livereload: true },
			scss: {
				files: ['src/sass/**/*.sass', 'src/sass/**/*.scss'],
				tasks: ['sass', 'postcss'],
				options: {
					interrupt: true
				}
			},
			pug: {
				files: ['src/pug/**/*.pug'],
				tasks: ['pug'],
				options: {
					interrupt: true
				}
			}
		},
		pug: {
			compile: {
				options: {
					pretty: true
				},
				files: [{
					src: ['**/*.pug', '!**/_*.pug'],
					dest: "web_dist/",
					ext: ".html",
					cwd: "src/pug/",
					expand: true
				}]
			}
		},
		sass: {
			dist: {
				options: {
					implementation: sass,
					outputStyle: 'expanded',
					sourceMap: false
				},
				files: [{
					expand: true,
					cwd: 'src/sass/',
					src: ['*.scss'],
					dest: 'web_dist/css/',
					ext: '.css'
				}]
			}
		},
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({ overrideBrowserslist: 'last 2 versions' }), // add vendor prefixes
				]
			},
			dist: {
				src: ['web_dist/css/*.css']
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'web_dist/css',
					src: ['*.css', '!*.min.css'],
					dest: 'web_dist/css',
					ext: '.min.css'
				}]
			}
		}
	});

	// Load the Grunt plugins.
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Set task aliases
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['pug', 'sass', 'postcss', 'cssmin']);
};
