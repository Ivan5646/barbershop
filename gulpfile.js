// styles min, watch
// scripts min, watch
// browser reload / sync


var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss'); // to minify files
var concat = require('gulp-concat');
var minify = require('gulp-minify'); // minify js

gulp.task('app-styles', function() {
  return gulp.src("src/styles/blocks/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(gulp.dest("build/styles/blocks"));
});

gulp.task('app-scripts', function() {
  return gulp.src("src/js/*.js")
    .pipe(concat('all.js'))
    .pipe(minify())
    .pipe(gulp.dest("build/js"));
});