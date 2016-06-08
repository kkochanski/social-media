var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var series = require('stream-series');

var paths = {
    allScripts: ['gulpfile.js',
        'client/*.js',
        'client/components/**/*.js',
        'client/shared/**/*.js',
        'server/controllers/*.js',
        'server/services/*.js'
    ]
};

gulp.task('lint', function() {
    return gulp.src(paths.allScripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('index', function () {
    var target = gulp.src('./client/index.html');
    var basicSources = gulp.src(['./client/*.js', './client/components/**/*.module.js']);
    var sources = gulp.src([
        './client/components/**/*.controller.js',
        './client/components/**/*.directive.js',
        './client/components/**/*.factory.js',
        './client/components/**/*.service.js',
        './client/components/**/*.provider.js',
        './client/shared/**/*.js'
    ]);
    
    return target.pipe(inject(series(basicSources, sources), {relative: true}))
        .pipe(gulp.dest('./client'));
});