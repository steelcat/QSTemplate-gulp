var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
	gutil = require('gulp-util'),
	notify = require('gulp-notify'),
	duration = require('gulp-duration'),
	log = require('./errorHandler'),
	colors = require('colors'),
	configs = require('./configs'),
	configsSass = configs.sass,
	configsAutoprefixer = configs.autoprefixer,
	isProduction = configs.isProduction,
	paths = configs.paths;

gulp.task('sass', function () {
	return gulp.src(paths.srcPaths.scss)
		.pipe(sass({
			style: configsSass.style,
			sourcemap: configsSass.sourcemap,
			sourcemapPath: paths.destPaths.css
		}))
		.on('error', log)
		.pipe(duration('Finished SASS task in'))
		.pipe(autoprefixer({
			// More about browser: https://github.com/postcss/autoprefixer#browsers
			browsers: [
				'Android >= ' + configsAutoprefixer.android,
				'Chrome >= ' + configsAutoprefixer.chrome,
				'Firefox >= ' + configsAutoprefixer.firefox,
				'Explorer >= ' + configsAutoprefixer.ie,
				'iOS >= ' + configsAutoprefixer.ios,
				'Opera >= ' + configsAutoprefixer.opera,
				'Safari >= ' + configsAutoprefixer.safari
			],
			cascade: true
		}))
		.pipe(duration('Finished Autoprefixer task in'))
		.pipe(isProduction ? cssmin() : gutil.noop())
		.pipe(isProduction ? duration('Finished CssMin task in') : gutil.noop())
		.pipe(gulp.dest(paths.destPaths.css))
		.pipe(reload({stream: true}))
		.pipe(notify('File created: ' + paths.destPaths.css + '<%= file.relative %>! SASS Finished.'));
});