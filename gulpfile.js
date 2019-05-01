var gulp = require('gulp');
var sass= require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemap = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return gulp.src('source/scss/*.scss')
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync ({
        server: {
            baseDir: 'source'
        },
        notify: false
    });
});

gulp.task('watch', function() {
    gulp.watch('source/scss/*.scss', gulp.parallel('sass'));
    gulp.watch('source/scss/*.scss', gulp.parallel('browser-sync'));
});

gulp.task('default', gulp.parallel('watch'));