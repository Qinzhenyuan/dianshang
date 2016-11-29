/*
	目的：编译sass文件
	1）引入gulp和gulp-sass两个包
	2）编写任务
	3）运行任务
 */


//1）引入gulp和gulp-sass两个包
var gulp = require('gulp');//本地安装为了在这里引入gulp
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();


// 2)编写任务
gulp.task('buildSass',function(){
	// console.log('编译完成');

	// 匹配文件
	return gulp.src('./src/sass/*.scss')

		// 编译
		.pipe(sass({outputStyle:'expanded'}))

		// 输出文件
		.pipe(gulp.dest('./src/css'))


		// 输出文件后可以确定css完成编译
		// 刷新操作一定要在编译完成后进行
		.pipe(browserSync.reload({stream:true}));
});


// 监听sass文件修改，并自动编译
gulp.task('jtSass',function(){
	gulp.watch('./src/sass/*.scss',['buildSass']);
});


// 运行任务（全局安装为了运行gulp任务）
// 在命令提示符进行
// 格式：gulp 任务名


// 同步测试


// 创建一个任务
gulp.task('server',['jtSass'],function(){
	browserSync.init({
		server:{
			baseDir:'./src'
		},

		// 监听文件修改并自动刷新
		// **代表任意目录
		// *代表任意文件名
		files:['./src/**/*.html','./src/css/*.css','./src/js/*.js']
	})
})