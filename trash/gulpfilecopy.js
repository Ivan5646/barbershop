//'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var del = require('del'); // remove
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss'); // to minify files
var series = require('stream-series');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var babel = require("gulp-babel"); //?
var browserify = require('gulp-browserify'); //?
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var express = require('express');
var proxy = require('http-proxy-middleware');
var argv = require('minimist')(process.argv.slice(2)); // what does it do?
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var config = require('./config.json');

// get env variable
var env = "development"; //  = "development";
if(argv.production){
  env = "production";
} 
env = "development"; // test

gulp.task('connect', function () {
  connect.server({
    port: config[env].connect.port, 
    root: config[env].connect.root,
    livereload: true,
    middleware: function(connect, opt) {
    return [
      proxy('/api', {
          target: config[env].connect.proxyAPI,
          changeOrigin: true,
          ws: true  // <-- set it to 'true' to proxy WebSockets
        })
      ]
    }
  });
});

gulp.task('app-styles', function() {
  return gulp.src(config[env].styles.source) // 
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(config[env].styles.concat, concat(config[env].styles.output)))
    .pipe(gulpif(config[env].styles.minify, uglifycss()))
    .pipe(gulp.dest(config[env].styles.destApp))
    .pipe(connect.reload()); // ?
});

gulp.task('vendor-styles', function () {
  return gulp.src(config[env].styles.vendors)
    .pipe(gulpif(config[env].styles.concat, concat('vendors.min.css')))
    .pipe(gulpif(config[env].styles.minify, uglifycss()))
    .pipe(gulp.dest(config[env].styles.destVendors));
});

gulp.task('app-scripts', function () {
    var bundler = browserify({entries: './src/js/main.js', debug: true});
    bundler.transform(babelify);

   return bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(gulpif(config[env].scripts.sourcemaps, sourcemaps.init({ loadMaps: true })))
        .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(gulpif(config[env].scripts.sourcemaps, sourcemaps.write('./'))) // './'' ?
        .pipe(connect.reload())
        .pipe(gulp.dest(config[env].scripts.destApp));
});
    
gulp.task('vendor-scripts', function () {
  return gulp.src(config[env].scripts.vendors) 
    .pipe(gulpif(config[env].scripts.concat, concat('vendors.min.js')))
    .pipe(gulpif(config[env].scripts.minify, uglify()))
    .pipe(gulp.dest(config[env].scripts.destVendors));
});

gulp.task('index', function () {
  var vendorStream = gulp.src(config[env].styles.vendorStream.concat(config[env].scripts.vendorStream), {read: false});
  var appStream = gulp.src(config[env].styles.appStream.concat(config[env].scripts.appStream), {read: false});
  return gulp.src('src/index.html')
    .pipe(inject(series(vendorStream, appStream), {ignorePath: config[env].rootDest, addRootSlash: false}))
    .pipe(connect.reload())
    .pipe(gulp.dest(config[env].rootDest));
});

gulp.task('clean', function () {
  return gulp.src(['build/*', 'src/styles/css/*']).pipe(clean());
});

gulp.task('build', function(callback) {
  runSequence('clean',
              ['vendor-styles', 'vendor-scripts', 'app-styles', 'app-scripts'],
              'index', callback);
});

// gulp-watch plugin?
gulp.task('watch', function () {
  var appStyles = ['app-styles'];
  var appScripts = ['app-scripts'];
  var index = ['index'];

  gulp.watch('src/styles/*.sass', appStyles);
  gulp.watch('src/js/*.js', appScripts);
  gulp.watch('src/index.html', index);
});

// launched in console with "gulp"
gulp.task('default', function () {
  require('./server.js');
  runSequence('build', 'watch', 'connect');
});
