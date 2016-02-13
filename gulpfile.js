var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var maps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var paths = ['**/**/*.sass'];

var bowerjs = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'bower_components/slick-carousel/slick/slick.min.js',
  'bower_components/angular-slick/dist/slick.js',
  'bower_components/ngSmoothScroll/lib/angular-smooth-scroll.js'
];

var bowercss = [
  'assets/lib/icon-font.min.css',
  'assets/lib/bootstrap.min.css',
  'bower_components/slick-carousel/slick/slick.css',
  'bower_components/slick-carousel/slick/slick-theme.css',
  'bower_components/font-awesome/css/font-awesome.min.css'
];

gulp.task('vendor', function () {
  gulp.src(bowerjs)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));

  gulp.src(bowercss)
    .pipe(concatCss('vendor.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', function () {
  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed',
    indentedSyntax: true
  };

  return gulp.src('assets/sass/main.sass')
    .pipe(maps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer())
    .pipe(maps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  gulp.src(['app/app.module.js', 'app/**/*.js'])
    .pipe(maps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(maps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['vendor', 'sass', 'scripts'], function () {
  browserSync.init({
    server: './',
    browser: 'google chrome'
  });

  gulp.watch(paths, ['sass']);
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('dist/*js').on('change', browserSync.reload);
  gulp.watch('**/**.html').on('change', browserSync.reload);
});

gulp.task('build', ['vendor', 'sass', 'scripts']);

gulp.task('default', ['build']);
