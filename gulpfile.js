const gulp = require('gulp')
const wait = require('gulp-wait')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-minify-css')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')

// TODO: Add task to transpile es6 to es5

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
    .pipe(gulp.dest('dist'))
)

gulp.task('scripts', () => {
  return gulp
    .src(['./src/js/script.js'])
    .pipe(
      babel({
        presets: [
          '@babel/preset-env',
          {
            modules: true,
          },
        ].map(require.resolve),
      })
    )
    .pipe(gulp.dest('dist'))
})

gulp.task('watch:sass', () => {
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
  gulp.watch('./src/js/**/*.js', gulp.series(['scripts']))
})
