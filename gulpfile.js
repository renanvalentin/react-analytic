var gulp = require('gulp'),
  connect = require('gulp-connect'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream');

gulp.task('connect', function() {
  connect.server({
    root: ['app', 'tmp'],
    livereload: true
  });
});

gulp.task('browserify', function() {
    return browserify('./app/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./tmp/'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', ['browserify', 'html'], function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/*.js'], ['browserify']);
});

gulp.task('default', ['connect', 'watch']);
