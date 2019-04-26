var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');

gulp.task('styles', styles);

function styles(done) {
	return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error', function (errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
	.pipe(gulp.dest('./app/temp/styles.css'));
	if(done) done();
}

//gulp.task('styles', function(){
//	return gulp.src('./app/assets/styles/styles.css')
//	.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
//	.pipe(gulp.dest('./app/temp/styles.css'));
//});
