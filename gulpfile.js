var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var webp = require('gulp-webp');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');

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
  return gulp.src('source/img/icons/**/*.svg')
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('source/img'))
});

gulp.task('watch', function () {
  gulp.watch('source/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('source/scss/**/*.scss', gulp.parallel('browser-sync'));
  gulp.watch(['source/img/**/*.png', 'source/img/**/*.jpg'], gulp.parallel('webp'));
  gulp.watch('source/img/icons/**/*.svg', gulp.parallel('sprite'));
});

gulp.task('default', gulp.parallel('watch'));
