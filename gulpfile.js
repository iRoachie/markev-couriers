const { series, src, dest, watch, parallel } = require('gulp');
const server = require('browser-sync').create();
const { spawnSync } = require('child_process');
const del = require('del');
const gulpIf = require('gulp-if');
const gulpSass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const gulpPurgeCSS = require('gulp-purgecss');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

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
  spawnSync(
    'bundle',
    ['exec', 'jekyll', 'build', '-s', './src', '-d', '_site'],
    {
      stdio: 'inherit',
    }
  );

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
  return src(['src/_scripts/*.js'])
    .pipe(gulpIf(development, sourcemaps.init()))
    .pipe(
      webpackStream({
        mode: development ? 'development' : 'production',
        entry: {
          home: './src/_scripts/home.js',
          contact: './src/_scripts/contact.js',
        },
        output: {
          filename: '[name].js',
          publicPath: 'dist/',
        },
        plugins: [
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
          }),
          new BundleAnalyzerPlugin({
            analyzerMode: process.env.BUNDLE ? 'server' : 'disabled',
          }),
        ],
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/](jquery|bootstrap)[\\/]/,
                name: 'vendor',
                chunks: 'all',
              },
            },
          },
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
              },
            },
          ],
        },
      })
    )
    .pipe(gulpIf(development, sourcemaps.write()))
    .pipe(dest('src/dist'));
};

const purgeCSS = () => {
  return src('_site/dist/main.css')
    .pipe(
      // @ts-ignore
      gulpPurgeCSS({
        content: ['_site/**/*.html', '_site/dist/*.js'],
      })
    )
    .pipe(dest('_site/dist'));
};

exports.build = series(clean, parallel(sass, scripts), jekyllBuild, purgeCSS);

exports.serve = series(local, exports.build, () => {
  server.init({
    server: {
      baseDir: '_site',
    },
    notify: false,
    open: false,
  });

  watch('src/**/*.scss', sass);
  watch(['src/**/*.html', 'src/**/*.yml', 'src/assets/**/*'], jekyllBuild);
  watch('src/_scripts/*.js', series(scripts, jekyllBuild));

  watch('_site/**/*', reload);
});
