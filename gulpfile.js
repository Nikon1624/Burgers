var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var webp = require('gulp-webp');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var cheerio = require('gulp-cheerio');
var cleanSvg = require('gulp-cheerio-clean-svg'); //npm install Hiswe/gulp-cheerio-clean-svg --save-dev
var replace = require('gulp-replace');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('source/scss/**/style.scss')
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'source'
    },
    notify: false
  });
});

gulp.task('webp', function () {
  return gulp.src(['source/img/**/*.png', 'source/img/**/*.jpg'])
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest('source/img'))
});

gulp.task('sprite', function() {
  return gulp.src('source/img/**/fill-*.svg')
  .pipe(cheerio(cleanSvg({
    attributes: ["id", "style", "fill*", "clip*", "stroke*", "mask", "opacity", "width", "height", "transform"]
  })))
  .pipe(replace('&gt;', '>'))
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('source/img'))
});

gulp.task('sprite-attribute', function() {
  return gulp.src(['!source/img/**/fill-*.svg', '!source/img/**/svg-sprite.svg', 'source/img/**/*.svg'])
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename('sprite-attribute.svg'))
  .pipe(gulp.dest('source/img'))
});

gulp.task('concat-sprite', function() {
  return gulp.src('source/img/**/sprite*.svg')
  .pipe(concat('svg-sprite.svg'))
  .pipe(gulp.dest('source/img'))
});

gulp.task('watch', function () {
  gulp.watch('source/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('source/scss/**/*.scss', gulp.parallel('browser-sync'));
  gulp.watch(['source/img/**/*.png', 'source/img/**/*.jpg'], gulp.parallel('webp'));
  gulp.watch('source/img/**/*.svg', gulp.parallel('sprite', 'sprite-attribute', 'concat-sprite'));
});

gulp.task('default', gulp.parallel('watch'));
