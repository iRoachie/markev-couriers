'use strict';

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const cp = require('child_process');
const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const run = require('run-sequence');

const $ = gulpLoadPlugins();
const spawn = cp.spawn;
let development = true;

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (gulpCallBack){
    browserSync.notify(messages.jekyllBuild);
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : `ERROR: Jekyll process exited with code: ${code}`);
    });
});

gulp.task('clean', del.bind(null, ['_site', 'dist']));

gulp.task('sass', () => {
	return gulp.src(['_scss/*.scss', '_scss/!_*.scss'])
		.pipe($.if(development, $.sourcemaps.init()))
		.pipe($.sass({
      includePaths: ['scss'],
      outputStyle: 'compressed'
  	}).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
      cascade: true,
    }))
		.pipe($.if(development, $.sourcemaps.write('.')))
    .pipe(gulp.dest('_site/dist'))
    .pipe( browserSync.stream({match: '**/*.css'}) )
    .pipe(gulp.dest('dist'))
});

gulp.task('scripts', () => {
	return browserify({
			entries: '_scripts/index.js',
			debug: true
		})
		.transform('babelify', {
			presets: ['es2015']
		})
		.bundle()
		.pipe(source('scripts.js'))
		.pipe(buffer())
    .pipe($.if(development, $.sourcemaps.init()))
		.pipe($.uglify())
    .pipe($.if(development, $.sourcemaps.write('.')))
		.pipe(gulp.dest(`dist`))
});

gulp.task('reload', () => {
  return browserSync.reload;
})

gulp.task('serve', ['build'], () => {
  browserSync.init({
		server: {
			baseDir: '_site'
		}
	});

  gulp.watch('_scss/**/*.scss', ['sass']);
  gulp.watch('_scripts/*.js', ['scripts']);
  gulp.watch('dist/scripts.js', ['jekyll-build']);
  gulp.watch('_site/**/*.js').on('change', browserSync.reload);
  gulp.watch('_site/*.html').on('change', browserSync.reload);
  gulp.watch(['*.html', 'content/**/*', '**/*.yml', '_layouts/*.html', '_includes/*.html', '_posts/*', '*php', 'examples/**/*'], ['jekyll-build', 'reload']);
});

gulp.task('build', () => {
  return new Promise(resolve => {
    run(['clean'], ['sass', 'scripts'], ['jekyll-build'], resolve)
  });
});

gulp.task('serve:production', ['production'], () => {
  browserSync.init({
    server: {
      baseDir: '_site'
    }
  });
})

gulp.task('production', () => {
  development = false;
  return new Promise(resolve => {
    run(['build'], resolve);
  })
});

gulp.task('heroku', () => {
  development = false;
  return new Promise(resolve => {
    run(['clean'], ['sass', 'scripts'], resolve)
  });
});


gulp.task('default', ['production']);
