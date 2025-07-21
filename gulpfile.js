const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const fileInclude = require('gulp-file-include');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');


function fonts() {
  return src('app/fonts/src/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({
      outputStyle: 'compressed'
    }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function svgSprites() {
  return src('app/images/icons/*.svg')
    .pipe(cheerio({
      run: ($) => {
        $("[fill]").removeAttr("fill");
        $("[stroke]").removeAttr("stroke");
        $("[style]").removeAttr("style");
      },
      parserOptions: {
        xmlMode: true
      },
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('app/images'));
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
      'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src(['app/images/src/*.*','app/images/src/*/*.*', '!app/images/src/*.svg'])
    .pipe(newer('app/images'))
    .pipe(avif({
      quality: 50
    }))

    .pipe(src(['app/images/src/*.*' ,'app/images/src/*/*.*']))
    .pipe(newer('app/images'))
    .pipe(webp())

    .pipe(src(['app/images/src/*.*' ,'app/images/src/*/*.*']))
    .pipe(newer('app/images'))
    .pipe(imagemin())

    .pipe(dest('app/images'))
}

function building() {
  return src([
      'app/**/*.html',
      'app/fonts/*.*',
      'app/images/*.*',
      'app/images/*/*.*',
      '!app/images/src/*.*',
      '!app/images/icons/*.svg',
      'app/images/sprite.svg',
      'app/css/style.min.css',
      'app/js/main.min.js'
    ], {
      base: 'app'
    })
    .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/html/**/*.html'], htmlInclude);
  watch(['app/images/icons/*.svg'], svgSprites);
  watch(['app/images/src'], images);
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}

const htmlInclude = () => {
  return src(['app/html/*.html'])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file',
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}

exports.htmlInclude = htmlInclude;
exports.svgSprites = svgSprites;
exports.styles = styles;
exports.scripts = scripts;
exports.building = building;
exports.fonts = fonts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, building);
exports.default = parallel(htmlInclude, svgSprites, styles, images, fonts, scripts, browsersync, watching);