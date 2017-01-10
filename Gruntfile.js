const devTasks = [
	'clean:typings',
	'typings:dev',
	'tslint',
	'clean:dev',
	'ts:dev',
	'copy:staticTestFiles',
	'copy:staticSiteFiles'
];

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');

	require('grunt-dojo2').initConfig(grunt, {
		appDirectory: './app',
		devTasks: devTasks,
		stylus: {
			dist: {
				options: {},
				files: [ {
					expand: false,
					src: 'app/styles/main.styl',
					ext: '.css',
					dest: '_build/app/src/styles/main.css'
				} ]
			}
		},

		copy: {
			staticSiteFiles: {
				expand: true,
				cwd: '.',
				src: [ '<%= appDirectory %>/**/*.html' ],
				dest: '<%= devDirectory %>'
			}
		}
	});

	grunt.registerTask('ci', [
		'intern:node',
		'intern:saucelabs'
	]);
};
