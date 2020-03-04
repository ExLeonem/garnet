var gulp = require('gulp');
var sass = require('gulp-sass');

// TODO: Minimizer for style files
// TODO: Minimzer for js files???



sass.compiler = require('node-sass');

// Regular sass compilation task
gulp.task('sass', function() {
    return gulp.src('./src/style/scss/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./src/style/css'));
});


// Sass Watcher
gulp.task('sass:watch', function() {
    gulp.watch('./src/style/scss/*.scss', gulp.series('sass'));
});