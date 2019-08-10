"use strict"

const {
  src,
  dest,
  lastRun,
  series,
} = require('gulp')

const imagemin = require('gulp-imagemin')
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminSvgo = require("imagemin-svgo");

const options = [
  imageminGifsicle({
    interlaced: true
  }),
  imageminJpegtran({
    progressive: true,
    arithmetic: true
  }),
  imageminOptipng({
    optimizationLevel: 7,
    bitDepthReduction: true,
    colorTypeReduction: true,
    paletteReduction: true
  }),
  imageminSvgo({
    plugins: [{ removeViewBox: true }, { cleanupIDs: true }]
  })
];

// image resize - asset
function imagemin_asset() {
  return src([
      './src/assets/src/*',
    ], {
      since: lastRun(imagemin_asset)
    })
    .pipe(imagemin([...options]))
    .pipe(dest([
      './src/assets/dist',
    ]))
}

// exports
exports.default = series(
  imagemin_asset,
)
