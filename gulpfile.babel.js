import gulp from "gulp";
import del from "del";

const routes = {
  src: "src/*.js",
  build: "build",
};

const clean = () => del(["build"]);

export const dev = gulp.series([clean]);
