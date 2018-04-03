var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var imagemin = require('gulp-imagemin');
var del = require('del');
var watch = require('gulp-watch')
var sh = require('shelljs');
//var debug = require('gulp-debug')

var fs = require('fs')
var path = require('path')

var iconPath = './src/assets/images/icons';
var sassPath = './src/assets/scss/icons';

function watchSprites(path){
  watch(path, function () {
    sh.exec('gulp sprites');
    sh.exec('gulp move')
  });
}
// 压缩dist图片   imagemin效果不好,注释掉
//gulp.task('imagemin', function () {
//  return gulp.src('./dist/static/:.{png,jpg}+')
//    .pipe(imagemin({
//      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
//      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
//    }))
//    .pipe(gulp.dest('./dist/static'))
//});

gulp.task('watch', function () {
  console.log('正在监听精灵图...')
  watchSprites(iconPath + '/:.png+')
  watchSprites(iconPath + '/:.jpg+')
});

gulp.task('sprites', function () {
  var spriteData = gulp.src(iconPath + '/:.png+').pipe(spritesmith({
    imgName: './assets/scss/icons/sprites.png',
    cssName: '_sprites.scss',
    padding: 6
    // algorithm: 'top-down',
    //cssFormat: 'sass'
  }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(sassPath));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    //.pipe(csso())
    .pipe(gulp.dest(sassPath));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);

  //return spriteData.pipe(gulp.dest('.dist/css/'));
});

gulp.task('move', function () {
  gulp.src(sassPath+'/assets/scss/icons/:.png+')
    .pipe(gulp.dest(sassPath));

  del([sassPath+'/assets']);
  console.log('重新生成成功')
})


var tinypng = require('gulp-tinypng-compress')

//一个月只能压缩500张图片, xxwade2014@163.com
var key = 'j57zyl_Hm8EFX-X-CKOWP1wRZd1F14Z_'

var imagesBase = path.resolve('./src/assets/images/')

// new revision img
var revisionImgBase = path.resolve('./src/assets/img/')

//图片压缩
gulp.task('tinypng', function () {
  readTraversal(imagesBase)
  readTraversal(revisionImgBase)

  function readTraversal (base) {
    var md5File = base + '/imgMd5Map'
    fs.readdir(base, function(err, files) {
      if (err) {
        console.log(err);
        return;
      }

      files.forEach(function (filename) {
        filename = base + '/' + filename
        fs.stat(filename, function (err, stats) {
          if (err) {
            console.log(err);
            return;
          }

          if (stats.isFile()) {
            var reg=/\.(?:jpg|png|jpeg)$/
            if (!reg.test(filename)) return;

            gulp.src(filename)
              .pipe(tinypng({
                key: key,
                sigFile: md5File,
                log: true,
                sameDest: true
              }))
              // .pipe(debug())
              .pipe(gulp.dest(base))

          }
          else if (stats.isDirectory ()) {
            readTraversal(filename)
          }
        });
      });
    });
  }

})


//移动dist目录中文件到
var dist = path.resolve('./dist/static')
var static = path.resolve('./static')
gulp.task('moveStatic', function () {
  //static下多的删掉, 少的加上, 没变的不懂
  var distObj = {}
  var staticObj = {}

  read(dist, distObj)
  read(static, staticObj)

  function read (base, obj) {
    var files = fs.readdirSync(base);

    files.forEach(function (filename) {
      filename = base + '/' + filename
      var stats = fs.statSync(filename)

      if (stats.isDirectory()) {
        read (filename, obj)
      } else {
        filename = filename.substr(filename.indexOf('static/')+7)
        obj[filename] = 1
        //arr.push(filename)
      }
    })
  }

  gulp.src([dist + '/*', dist + '/*/*'])
    .pipe(gulp.dest(static))

  for (var o in staticObj) {
    if (staticObj.hasOwnProperty(o)) {
      //不存在,删除
      if (!distObj[o]) {
        del(static + '/' + o)
      }
    }
  }
})

