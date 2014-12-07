var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('default', ['lint']);

gulp.task('lint', function() {
    return gulp.src([ 'app/**/*.js', 'config/**/*.js', 'util/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

