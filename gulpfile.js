const gulp = require('gulp')
const wait = require('gulp-wait')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-minify-css')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', () =>
  gulp
    .src('src/main.scss')
    .pipe(wait(350))
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browserList: ['defaults', 'last 4 versions'],
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest('css'))
)

gulp.task('watch:sass', () => {
  gulp.watch('./src/**/*.scss', gulp.series('sass'))
})
