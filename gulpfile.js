// grab our gulp packages
var gulp = require('gulp'),
    gutil =          require('gulp-util'),
    jshint =         require('gulp-jshint'),
    sass =           require('gulp-sass'),
    concat =         require('gulp-concat'),
    uglify =         require('gulp-uglify'),
    rename =         require('gulp-rename'),
    processhtml = require('gulp-processhtml'),
    connect = require('gulp-connect'),
    opts = { /* plugin options */ };


var srcPath = {
    scss:        'src/scss/*.scss',
    js:          'src/js/*.js',
    html:        'src/views/*.html',
    components:  'src/views/**/*.html',
    img:         'src/img/*'
},
destPath = {
    js:          'public/js',
    css:         'public/css',
    img:         'public/img'
};

gulp.task('lint', function() {
    return gulp.src(srcPath.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('script.js'))
        .pipe(gulp.dest(destPath.js))
});

gulp.task('sass', function() {
    return gulp.src(srcPath.scss)
        .pipe(concat('style.css'))
        .pipe(sass())
        .pipe(gulp.dest(destPath.css));
});

gulp.task('processhtml', function() {
        return gulp.src([srcPath.html, srcPath.components])
        .pipe(processhtml({recursive: true}))
        .pipe(gulp.dest('public'));
});

gulp.task('img', function() {
        return gulp.src(srcPath.img)
        .pipe(gulp.dest(destPath.img));
});

gulp.task('server', function() {
    connect.server({
        root: 'public',
        livereload: false,
        port: 9000
    });
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(srcPath.js, ['lint']);
    gulp.watch(srcPath.scss, ['sass']);
    gulp.watch(srcPath.components, ['processhtml']);
    gulp.watch(srcPath.img, ['img']);
});

//Default Task
gulp.task('default', ['lint', 'watch', 'processhtml', 'img', 'server']);