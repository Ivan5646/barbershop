// styles min, watch
// scripts min, watch
// browser reload / sync


var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss'); // to minify files
var concat = require('gulp-concat');
var minify = require('gulp-minify'); // minify js
var watch = require('gulp-watch');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('app-styles', function() {
  return gulp.src("src/styles/blocks/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(gulp.dest("build/styles/blocks"))
    .pipe(connect.reload());
});

gulp.task('app-scripts', function() {
  return gulp.src("src/js/*.js")
    .pipe(concat("all.js"))
    .pipe(minify())
    .pipe(gulp.dest("build/js"))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  var appStyles = ['app-styles'];
  var appScripts = ['app-scripts'];
  // var index = ['index'];

  gulp.watch('src/styles/blocks/*.scss', appStyles);
  gulp.watch('src/js/*.js', appScripts);
  // gulp.watch('src/index.html', index);
});

gulp.task('default', ['connect', 'watch']);