var gulp = require('gulp'),
  connect = require('gulp-connect'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  path = require('path')

const appDir = path.join(__dirname, './app')
const tempDir = path.join(__dirname, './tmp')

function includeFile(file) {
  return path.join(appDir, file)
}

gulp.task('connect', ['browserify', 'html'], function() {
  connect.server({
    root: [appDir, tempDir],
    livereload: true
  })
})

gulp.task('browserify', function() {
    return browserify(includeFile('main.js'))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(tempDir))
        .pipe(connect.reload())
})

gulp.task('html', function () {
  gulp.src(includeFile('*.html'))
    .pipe(connect.reload())
})

gulp.task('watch', ['browserify', 'html'], function () {
  gulp.watch([includeFile('*.html')], ['html'])
  gulp.watch([includeFile('*.js')], ['browserify'])
})

gulp.task('default', ['connect', 'watch'])

gulp.task('serve', ['connect'])


