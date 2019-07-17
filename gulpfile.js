"use strict"

const {
  src,
  dest,
  lastRun,
  series,
} = require('gulp')

const imagemin = require('gulp-imagemin')

// image resize - asset
function imagemin_asset() {
  return src([
      './src/assets/src/*',
    ], {
      since: lastRun(imagemin_asset)
    })
    .pipe(imagemin())
    .pipe(dest([
      './src/assets/dist',
    ]))
}

// exports
exports.default = series(
  imagemin_asset,
)
