const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const wait = require('gulp-wait')

gulp.task('prefixer', () =>
  gulp
    .src('src/main.scss')
    .pipe(wait(200))
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions']
      })
    )
    .pipe(gulp.dest('css'))
)

gulp.task('watch:styles', () => {
  gulp.watch('./src/**/*.scss', gulp.series('prefixer'))
})
