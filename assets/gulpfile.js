// ==========================================================================
// # DEPENDENCIES
// ==========================================================================

var gulp = require('gulp'),
gulpLoadPlugins = require('gulp-load-plugins');

plugins = gulpLoadPlugins();

plugins.prefix = require('gulp-autoprefixer');
plugins.postcss = require('gulp-postcss');
plugins.pixrem = require('pixrem');
plugins.csswring = require('csswring');
plugins.mqpacker = require('css-mqpacker');
plugins.sass = require("gulp-sass");
plugins.sourcemaps = require("gulp-sourcemaps");
plugins.jshint = require('gulp-jshint');
pluginsstylish = require('jshint-stylish');
plugins.mocha = require('gulp-mocha');
plugins.argv = require('yargs').argv;

// ==========================================================================
// # CONSTANTS
// ==========================================================================

var basePath      = "./";

var cssSrcDir 		= basePath + 'sass';
var cssSrcFiles 	= cssSrcDir + '/**/*.scss';
var cssDestDir		= basePath + 'css';
var cssDestFiles    = cssDestDir + '/*.css';

var jsSrcDir      = basePath + 'js';
var jsSrcFiles    = [jsSrcDir + '/**/*.js', !jsSrcDir + '/es6-module-loader.js', !jsSrcDir + '/system.js', !jsSrcDir + '/traceur.js', !jsSrcDir + '/vendor/*.js'];

// ==========================================================================
// # TASKS
// ==========================================================================

/* #TESTS
   ===========================================================================*/

gulp.task('test', function () {
    var testSrc = plugins.argv.tests ? './test/' + plugins.argv.tests : './test/**/test-*.js';
    process.env.TEST_ROOT_URL = 'http://cliff.justeatbaby.com';
    return gulp.src(testSrc, {read: false})
    .pipe(plugins.mocha({
        reporter: 'spec',
        globals:  ['TEST*']
     }));
});

// # JSHINT
// ==========================================================================

gulp.task('jshint', function() {
    return gulp.src([
        jsSrcDir + '/**/*.js',
        '!' + jsSrcDir + '/es6-module-loader.js',
        '!' + jsSrcDir + '/es6-module-loader.src.js',
        '!' + jsSrcDir + '/system.js',
        '!' + jsSrcDir + '/traceur.js',
        '!' + jsSrcDir + '/vendor/*.js',
    ])
    .pipe(plugins.jshint({esnext: true}))
    .pipe(plugins.jshint.reporter(plugins.stylish));
});

/* # CSS
   ========================================================================== */

gulp.task('sass', function() {
    var processors = [
        plugins.mqpacker,
        plugins.pixrem,
        plugins.csswring
    ];
    gulp.src(cssSrcFiles)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            errLogToConsole: true
        }))
        .pipe(plugins.prefix())
        .pipe(plugins.postcss(processors))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(cssDestDir));

});

// ==========================================================================
// # CORE TASKS
// ==========================================================================

// Default task
gulp.task('default', ['sass'], function () {
    gulp.watch( cssSrcFiles, ['sass']);
    gulp.watch( [jsSrcFiles, './test/**/*.js', './test/*.js'], ['jshint', 'test']);
});

// Build
gulp.task('build', ['sass']);