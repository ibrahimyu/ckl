var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var del = require('del');
var inject = require('gulp-inject');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
	sass: ['./app/scss/**/*.scss'],
	scripts: ['app/**/*.js']
};

var indexPage = gulp.src('./app/index.html');

function clean() {
	return del(['./www/css', './www/js', './www/templates']);
}

function styles(done) {
	gulp.src('app/scss/*.scss')
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('./www/css/'))
		.on('end', done);
}

function copy() {
	return gulp.src(['./app/**/*.js'])
		.pipe(gulp.dest('./www/js/'));
}

function index() {
	var sources = gulp.src(['./js/**/*.js', './css/**/*.css'], {
		read: false,
		cwd: 'www/'
	});

	return indexPage.pipe(inject(sources, {
			addRootSlash: false
		}))
		.pipe(gulp.dest('./www/'));
}

function templates() {
	return gulp.src('./app/**/*.html')
		.pipe(templateCache())
		.pipe(gulp.dest('./www/js/'));
}

function compress() {
	return gulp.src(paths.scripts)
		.pipe(concat('all.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest('./www/js/'));
}

function watch() {
	gulp.watch('./app/**/*.scss', styles);
	gulp.watch('./app/**/*.js', copy);
	gulp.watch('./app/**/*.html', templates);
}

gulp.task(clean);
gulp.task(styles);
gulp.task(copy);
gulp.task(templates);
gulp.task(compress);
gulp.task(index);
gulp.task(watch);

gulp.task('debug', gulp.series(clean, gulp.parallel(styles, copy, templates), index, watch));
gulp.task('build', gulp.series(clean, gulp.parallel(styles, compress, templates), index));

gulp.task('default', gulp.series('debug'));
