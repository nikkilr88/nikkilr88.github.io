const gulp = require('gulp')
const wait = require('gulp-wait')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const webpack = require('webpack-stream')
const minifyCSS = require('gulp-minify-css')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', () =>
  gulp
    .src('src/scss/main.scss')
    .pipe(wait(350))
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browserList: ['defaults', 'last 4 versions'],
      })
    )
    .pipe(minifyCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('dist'))
)

gulp.task('scripts', () => {
  return gulp
    .src(['./src/js/index.js'])
    .pipe(plumber())
    .pipe(babel())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
  gulp.watch('./src/js/**/*.js', gulp.series(['scripts']))
})
