'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const connect = require('gulp-connect');


//
// Settings
//
const dev = './dev';
const src = './src';




//
// Browserify
//
gulp.task('browserify', () => {
	const input = 'index.js';
	const output = 'bundle.js';

	const bundler = watchify(browserify(Object.assign({}, watchify.args, {
		debug: true,
		entries: [`${src}/js/${input}`]
	})))
		.transform(babelify.configure({
			presets: ['es2015']
		}));


	bundler.on('log', gutil.log);
	bundler.on('update', bundle);


	function bundle() {
		return bundler
			.bundle()
			.on('error', gutil.log)
			.pipe(source(output))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(`${dev}/js`))
			.pipe(connect.reload()); // Livereload
	}

	return bundle();
});

//
// Connect 
//
gulp.task('connect', () => {
	connect.server({
		root: dev,
		livereload: true
	});
});


//
// Tasks
//
gulp.task('server', ['connect', 'browserify']);
