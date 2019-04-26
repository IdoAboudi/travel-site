var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');

var browserSync = require('browser-sync').create();

gulp.task('default', function(){
	console.log("Default task");
});

gulp.task('html', html);

function html(done) {
	return console.log("Imagne this is Html file");
	if(done) done();
}

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

gulp.task('watch', function(done){

	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});

	watch('./app/index.html', function(){
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function(){
		cssInject();
	});
});

function cssInject(done) {
	styles();
	return gulp.src('./app/temp/styles.css')
	.pipe(browserSync.stream());
	if(done) done();
}

//gulp.task('cssInject', ['styles'], cssInject);