var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-cssnano');
var webp = require('gulp-webp');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
  return gulp.src('source/scss/**/style.scss')
    .pipe(sourcemap.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css'))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemap.write('.'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('minify', function() {
  return gulp.src('source/css/style.css')
  .pipe(sourcemap.init())
  .pipe(minify())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('source/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
  return gulp.src('source/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
  return gulp.src('source/js/**/*.js')
  .pipe(browserSync.reload({stream: true}))
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
      quality: 85
    }))
    .pipe(gulp.dest('source/img'))
});

gulp.task('image', function() {
  return gulp.src('source/img/**/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('source/img'))
});

gulp.task('sprite', function() {
  return gulp.src('source/img/icons/**/*.svg')
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('source/img'))
});

gulp.task('watch', function () {
  gulp.watch('source/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('source/css/style.css', gulp.parallel('minify'));
  gulp.watch(['source/scss/**/*.scss', 'source/*.html', 'source/js/**/*.js'], gulp.parallel('browser-sync'));
  gulp.watch(['source/img/**/*.png', 'source/img/**/*.jpg'], gulp.parallel('webp'));
  gulp.watch('source/img/icons/**/*.svg', gulp.parallel('sprite'));
});

gulp.task('default', gulp.parallel('watch'));
