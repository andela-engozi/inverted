'use strict'
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserSync2 = require('browser-sync').create();
const babel = require('gulp-babel');
const webpack= require('webpack-stream');
const rename = require('gulp-rename');

//watch task
gulp.task('watch', () => {
    gulp.watch(['public/lib/js/**', 'public/inverted-index.js'], browserSync.reload);
    gulp.watch(['src/inverted-index.js'], ['babel']);
    gulp.watch(['jasmine/spec/inverted-index-test.js'], browserSync2.reload);
    gulp.watch('public/lib/css/*.css', browserSync.reload);
    gulp.watch('public/*.html', browserSync.reload);
});

//reload html file
gulp.task('serve', ()=>{
    browserSync.init({
        server: {
            baseDir: "public",
            index: "index.html"
        }, 
        port: 3000,
        ui : {
            port: 3001
        }
    });
});


gulp.task('bundle-test', function() {
  return gulp.src('./jasmine/spec/inverted-index-test.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(rename({basename: "bundle"}))
    .pipe(gulp.dest('./jasmine/spec/'));
});

gulp.task('bundle-app', function() {
  return gulp.src('./public/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(rename({basename: "bundle"}))
    .pipe(gulp.dest('./public/'));
});

gulp.task('babel', () => {
    return gulp.src('src/inverted-index.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('public/'));
});

gulp.task('load-test', ()=>{
    browserSync2.init({
        server: {
            baseDir: 'jasmine',
            index: 'SpecRunner.html'
        },
        port: 5000,
        ui : {
            port: 5001
        }
    });
})


gulp.task('default', ['bundle-test','bundle-app', 'serve', 'load-test', 'watch']);