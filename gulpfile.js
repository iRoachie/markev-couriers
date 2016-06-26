const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const maps = require('gulp-sourcemaps');
const ngAnnotate = require('gulp-ng-annotate');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const rename = require('gulp-rename');const util = require('gulp-util');

const paths = ['**/**/*.sass'];
const path = util.env.production ? 'dist/' : './';

const bowerjs = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'bower_components/slick-carousel/slick/slick.min.js',
  'bower_components/angular-slick/dist/slick.js',
  'bower_components/ngSmoothScroll/lib/angular-smooth-scroll.js',
  'bower_components/angular-messages/angular-messages.min.js'
];

const bowercss = [
  'assets/lib/bootstrap.min.css',
  'bower_components/Ionicons/css/ionicons.min.css',
  'bower_components/font-awesome/css/font-awesome.min.css',
  'bower_components/slick-carousel/slick/slick.css',
  'bower_components/slick-carousel/slick/slick-theme.css'
];


gulp.task('vendor', function () {
  gulp.src(bowerjs)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path + 'serve'));

  gulp.src(bowercss)
    .pipe(concatCss('vendor.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(path + 'serve'));
});

gulp.task('sass', function () {
  let sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed',
    indentedSyntax: true
  };

  return gulp.src('assets/sass/index.sass')
    .pipe(maps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(maps.write('.'))
    .pipe(gulp.dest(path + 'serve'))
    .pipe(browserSync.stream());
});

gulp.task('pug', function () {
  gulp.src(['app/**/*.jade'])
    .pipe(rename(function (path) {
      path.dirname = '';
    }))
    .pipe(pug().on('error', util.log))
    .pipe(gulp.dest(path + 'serve'));
});

gulp.task('scripts', function () {
  gulp.src(['app/app.module.js', 'app/**/*.js'])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(maps.write('.'))
    .pipe(gulp.dest(path + 'serve'));
});

gulp.task('serve', ['build'], function () {
  browserSync.init({
    server: './'
  });

  gulp.watch(paths, ['sass']);
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('app/**/*.jade', ['pug']);
  gulp.watch(path + '/*js').on('change', browserSync.reload);
  gulp.watch('**/**.html').on('change', browserSync.reload);
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

gulp.task('build', ['vendor', 'sass', 'scripts', 'pug']);

gulp.task('default', ['build']);
