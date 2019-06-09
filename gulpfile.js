var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var cheerio = require('gulp-cheerio');
var cleanSvg   = require('gulp-cheerio-clean-svg');
var del = require('del');
var gcmq = require('gulp-group-css-media-queries');
var webp = require('gulp-webp');

gulp.task('sass', function () {
  return gulp.src('./source/scss/**/style.scss')
    .pipe(sourcemap.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cleanCSS())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.stream())
});

var jsFiles = [
  './source/js/polyfill.js',
  './source/js/svgxuse.js',
  './source/js/modernizr-custom.js',
  './source/js/jquery.touchSwipe.min.js',
  './source/js/script.js'
];

gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(sourcemap.init())
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/js'))
    .pipe(browserSync.stream())
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
  return gulp.src('source/img/icons/**/sprite-*.svg')
  .pipe(cheerio(cleanSvg({
    removeSketchType: true,
    removeEmptyGroup: true,
    removeEmptyDefs: true,
    removeEmptyLines: true,
    removeComments: true,
    tags: ["title", "desc"],
    attributes: ["id", "style", "fill*", "clip*", "stroke*", "mask", "opacity", "width", "height", "transform"]
  })))
  .pipe(replace("&gt;", ">"))
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('source/img'))
});

gulp.task('copy', function() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**/main.js',
    'source/*.html',
    'source/css/style.css'
    ],
    {
      base: "source"
    })
  .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('concatMedia', function() {
  return gulp.src('./source/css/style.css')
    .pipe(gcmq())
    .pipe(gulp.dest('./source/css'))
});

gulp.task('build', gulp.series('clean', 'concatMedia', 'copy'));

function watch () {
  browserSync.init({
      server: {
          baseDir: "./source"
      },
      notify: false
  });

  gulp.watch('./source/scss/**/*.scss', gulp.series('sass'));
  gulp.watch(['./source/js/**/*.js', '!./source/js/**/main.js'], gulp.series('scripts'));
  gulp.watch('./source/*.html').on('change', browserSync.reload);
  gulp.watch(['source/img/**/*.png', 'source/img/**/*.jpg'], gulp.series('webp'));
};

gulp.task('default', watch);
