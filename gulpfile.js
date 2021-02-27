const gulp = require("gulp"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass")
gulp.task("styles", function () {
  return gulp
    .src("public/assets-dev/css/**/*")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat("main.css"))
    .pipe(gulp.dest("public/assets/css"))
})
gulp.task("watch", function () {
  gulp.watch("public/assets-dev/css/**/*", gulp.series("styles"))
})
// BUG: if task watch no change everything, return the function task styles
gulp.parallel("styles", "watch")
