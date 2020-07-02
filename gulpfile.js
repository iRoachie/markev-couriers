const { series, src, dest, watch, parallel } = require('gulp');
const server = require('browser-sync').create();
const { spawnSync } = require('child_process');
const del = require('del');
const gulpIf = require('gulp-if');
const gulpSass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

let development = false;

/**
 * Set environment to development
 *
 * @param {() => any} cb
 */
const local = (cb) => {
  development = true;
  cb();
};

/**
 * Build html files with jekyll
 *
 * @param {() => any} cb
 */
const jekyllBuild = (cb) => {
  server.notify('<span style="color: grey">Running:</span> jekyll build');

  spawnSync('jekyll', ['build', '-s', './src', '-d', '_site'], {
    stdio: 'inherit',
  });

  cb();
};

/**
 * Reload the page
 *
 * @param {() => any} cb
 */
function reload(cb) {
  server.reload();
  cb();
}

const clean = () => {
  return del(['_site', 'src/dist']);
};

const sass = () => {
  return src(['src/_scss/*.scss', 'src/_scss/!_*.scss'])
    .pipe(gulpIf(development, sourcemaps.init()))
    .pipe(
      gulpSass({
        includePaths: ['scss'],
        outputStyle: 'compressed',
      })
    )
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(gulpIf(development, sourcemaps.write()))
    .pipe(dest('_site/dist'))
    .pipe(server.stream({ match: '**/*.css' }))
    .pipe(dest('src/dist'));
};

const scripts = () => {
  return src(['src/_scripts/index.js'])
    .pipe(gulpIf(development, sourcemaps.init()))
    .pipe(babel())
    .pipe(gulpIf(development, sourcemaps.write()))
    .pipe(rename('scripts.js'))
    .pipe(dest('src/dist'));
};

exports.build = series(clean, parallel(sass, scripts), jekyllBuild);

exports.serve = series(local, exports.build, () => {
  server.init({
    server: {
      baseDir: '_site',
    },
    open: false,
  });

  watch('src/**/*.scss', sass);
  watch(['src/**/*.html', 'src/**/*.yml'], jekyllBuild);
  watch('src/_scripts/*.js', series(scripts, jekyllBuild));

  watch('_site/**/*', reload);
});
