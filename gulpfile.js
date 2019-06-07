var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var webp = require('gulp-webp');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var imagemin = require('gulp-imagemin');
var del = require('del');
var gcmq = require('gulp-group-css-media-queries');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('source/scss/**/style.scss')
    .pipe(sourcemap.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cleanCSS())
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

gulp.task('copy', function() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**',
    'source/*.html',
    'source/css/*.css'
    ],
    {
      base: "source"
    })
  .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('build', gulp.series('clean', 'copy'));

gulp.task('watch', function () {
  gulp.watch('source/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('source/scss/**/*.scss', gulp.parallel('browser-sync'));
  gulp.watch(['source/img/**/*.png', 'source/img/**/*.jpg'], gulp.parallel('webp'));
  gulp.watch('source/img/icons/**/*.svg', gulp.parallel('sprite'));
});

gulp.task('default', gulp.parallel('watch'));
