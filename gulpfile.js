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
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var util = require('gulp-util');
var gzip = require('gulp-gzip');
var del = require('del');
var middleware = require('connect-gzip-static')('./');

var paths = ['**/**/*.sass'];
var path = util.env.production ? 'dist/' : './';

var bowerjs = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'bower_components/slick-carousel/slick/slick.min.js',
  'bower_components/angular-slick/dist/slick.js',
  'bower_components/ngSmoothScroll/lib/angular-smooth-scroll.js',
  'bower_components/angular-messages/angular-messages.min.js'
];

var bowercss = [
  'assets/lib/bootstrap.min.css',
  'bower_components/Ionicons/css/ionicons.min.css',
  'bower_components/font-awesome/css/bower_components/Ionicons/css/ionicons.min.css',
  'bower_components/slick-carousel/slick/slick.css',
  'bower_components/slick-carousel/slick/slick-theme.css'
];

gulp.task('compress', ['clean'], function () {
  return gulp.src(['index.html', 'assets/fonts/*', 'assets/img/*', 'favicons/*'], {base: './'})
    .pipe(gzip())
    .pipe(gulp.dest('.'));
});

gulp.task('clean', function () {
  return del(['**/*.gz', 'dist', 'serve']);
});

gulp.task('vendor', ['clean'], function () {
  gulp.src(bowerjs)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gzip())
    .pipe(gulp.dest(path + 'serve'));

  gulp.src(bowercss)
    .pipe(concatCss('vendor.css'))
    .pipe(cssnano())
    .pipe(gzip())
    .pipe(gulp.dest(path + 'serve'));
});

gulp.task('sass', ['clean'], function () {
  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed',
    indentedSyntax: true
  };

  return gulp.src('assets/sass/index.sass')
    .pipe(maps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(maps.write('.'))
    .pipe(gzip())
    .pipe(gulp.dest(path + 'serve'))
    .pipe(browserSync.stream());
});

gulp.task('jade', ['clean'], function () {
  gulp.src(['app/**/*.jade'])
    .pipe(rename(function (path) {
      path.dirname = '';
    }))
    .pipe(jade().on('error', util.log))
    .pipe(gzip())
    .pipe(gulp.dest(path + 'serve'));
});

gulp.task('scripts', ['clean'], function () {
  gulp.src(['app/app.module.js', 'app/**/*.js'])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(maps.write('.'))
    .pipe(gzip())
    .pipe(gulp.dest(path + 'serve'));
});

gulp.task('serve', ['build'], function () {
  browserSync.init({
    server: './',
    files: [path + 'serve/*', 'favicons/*', 'assets/*']
  }, function (err, bs) {
    bs.addMiddleware('*', middleware, {
      override: true
    });
  });

  gulp.watch(paths, ['sass']);
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('app/**/*.jade', ['jade']);
  gulp.watch('index.html', ['compress']);
  gulp.watch(path + '/*js').on('change', browserSync.reload);
  gulp.watch('index.html.gz').on('change', browserSync.reload);
});

gulp.task('serve:dist', ['build'], function () {
  browserSync.init({
    server: './dist/'
  });
});

gulp.task('dist', ['build'], function () {
  gulp.src(['index.html', './favicons/**', './assets/**'], {base: './'})
    .pipe(gulp.dest(path));
});

gulp.task('build', ['compress', 'vendor', 'sass', 'scripts', 'jade'], function (cb) {
  cb();
});

gulp.task('default', ['build']);
