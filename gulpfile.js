const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
fibers = require("fibers");

//postcss読み込み
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");

// Dart-sassでコンパイル指定
sass.compiler = require("sass");

gulp.task("sass", function() {
  return gulp.src("./sass/**/*.scss")
    .pipe(sass({
      outputStyle: "expanded",
      fiber: fibers
    }))
    .pipe(postcss([autoprefixer({"overrideBrowserslist": ["last 2 versions"]})]))
    .pipe(postcss([cssdeclsort({order: "smacss"})]))
    .pipe(postcss([
      require("postcss-reporter")()
    ]))
    .pipe(gulp.dest("./docs/common/css"));
});

gulp.task("browserSync", function() {
    browserSync.init({
      server : {
          baseDir : './docs',
          index : 'index.html',
      },
  });
  done();
});

gulp.task('browserReload', (done) => {
  browserSync.reload();
  done();
});

gulp.task("sass:watch", function() {
    gulp.watch("./sass/**/*.scss", gulp.task("sass"));
});

gulp.task("build:watch", function() {
  gulp.watch("./docs/**", gulp.task("browserReload"));
  gulp.watch("./sass/**/*.scss", gulp.task("sass"));
  gulp.watch("./docs/**", gulp.task("browserSync"));
});