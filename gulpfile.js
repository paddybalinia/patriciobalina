const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const scss = require("gulp-sass")(require("sass"));
const minify = require("gulp-minify");
const autoprefixer = require("gulp-autoprefixer");

const paths = {
  styles_scss: {
    src: ["static/src/scss/**/*.scss", "!static/src/scss/vars.scss"],
    dest: "static/src/css",
  },
  styles_css: {
    src: "static/src/css/*.css",
    dest: "static/dist/css",
  },
  scripts: {
    src: "static/src/js/*.js",
    dest: "static/dist/js",
  },
  images: {
    src: "static/src/images/**/*",
    dest: "static/dist/images",
  },
};

function styles_scss() {
  return gulp
    .src(paths.styles_scss.src)
    .pipe(scss({ bundleExec: true }))
    .pipe(autoprefixer({ overrideBrowserslist: ["> .5%, last 2 versions"] }))
    .pipe(gulp.dest(paths.styles_scss.dest));
}

function styles_css() {
  return gulp
    .src(paths.styles_css.src)
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.styles_css.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(minify())
    .pipe(gulp.dest(paths.scripts.dest));
}

function images() {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

async function build() {
  await Promise.all([scripts(), styles_scss(), styles_css(), images()]);
}

function watch() {
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.styles_scss.src, styles_scss);
  gulp.watch(paths.styles_css.src, styles_css);
  gulp.watch(paths.scripts.src, scripts);
}

exports.build = build;
exports.watch = watch;
