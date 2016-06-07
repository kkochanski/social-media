var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

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