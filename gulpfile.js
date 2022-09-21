const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });

  watch('app/scss/**/*.scss', buildCss);
  watch('app/pug/**/*.pug', buildHtml);
};

const buildCss = () => {
  console.log('Компиляция SASS');

  return src('app/scss/*.scss')
    .pipe(sass({ sourceMap: false }))
    .pipe(cleanCSS())
    .pipe(concat('style.css'))
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
}

const buildHtml = () => {
  console.log('Компиляция Pug');

  return src('app/pug/*.pug')
    .pipe(pug())
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
}

const develop = () => {
  buildCss();
	buildHtml();
	browserSyncJob();
};

exports.server = browserSyncJob;
exports.build = series(buildCss, buildHtml);
exports.develop = develop;