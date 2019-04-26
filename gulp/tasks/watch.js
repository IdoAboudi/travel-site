var gulp = require('gulp');
var watch = require('gulp-watch');

var browserSync = require('browser-sync').create();

var styles = require('../tasks/styles');

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
	styles.styles();
	return gulp.src('./app/temp/styles.css')
	.pipe(browserSync.stream());
	if(done) done();
}

//gulp.task('cssInject', ['styles'], cssInject);