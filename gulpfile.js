const gulp = require('gulp');
const typescript = require('gulp-typescript');
const del = require('del');

// gulpコマンドで実行するデフォルトタスク
gulp.task('default',[
    'clean:dist',
    'compile:ts',
    'watch'
]);

// distフォルダを空っぽに
gulp.task('clean:dist', function(){
    return del.sync(['dist/*']); 
});

// src/tsをコンパイルしてdist/jsに展開
gulp.task('compile:ts', function(){
    return gulp.src(['src/ts/*.ts'])
        .pipe(typescript())
        .js 
        .pipe(gulp.dest('dist/js/'));
});

// srcフォルダの監視
// tsが編集されたらタスクを再実行
gulp.task('watch', function(){
    gulp.watch([
        'src/ts/*.ts'
    ], ['compile:ts']); 
});