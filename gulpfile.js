var gulp = require( 'gulp' ),
    ejs = require( 'gulp-ejs' ),
    fs = require( 'fs' );
    rename = require('gulp-rename');
    htmlmin = require('gulp-htmlmin');

//開発用コンパイル
gulp.task('ejs', function() {
  var json = JSON.parse(fs.readFileSync('src/assets/ejs/template/meta.json'));
  return gulp.src(['src/assets/ejs/**/*.ejs', '!src/assets/ejs/**/_*.ejs'])
      .pipe(ejs({json}))
      .pipe(rename({ extname: '.html' }))
      .pipe(gulp.dest('dist'));
});

//本番用コンパイル
gulp.task('ejs_pro', function() {
  var json = JSON.parse(fs.readFileSync('src/assets/ejs/template/meta.json'));
  return gulp.src(['src/assets/ejs/**/*.ejs', '!src/assets/ejs/**/_*.ejs'])
      .pipe(ejs({json}))
      .pipe(rename({ extname: '.html' }))
      .pipe(htmlmin({
        // 余白を除去する
        collapseWhitespace : false,
        // HTMLコメントを除去する
        removeComments : true
      }))
      .pipe(gulp.dest('dist'));
});