const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


const paths = {
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  html: './*.html'
};


function styles() {
  return src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}


function serve() {
  browserSync.init({
    server: './'
  });

  watch(paths.scss, styles);
  watch(paths.html).on('change', browserSync.reload);
  watch(paths.js).on('change', browserSync.reload);
}


exports.default = series(styles, serve);
