var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var paths = ['assets/css/*.sass', 'app/**/*.sass'];

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch(paths, ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed',
  indentedSyntax: true
};


gulp.task('sass', function() {
  return gulp
  .src(paths)
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(gulp.dest("assets/css"))
  .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
