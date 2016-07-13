#! /usr/bin/env node
const program = require('commander')
const config = require('../package')

program
  .version(config.version)
  .option('analyse', 'Analyse files')
  .option('serve', 'Run server')
  .parse(process.argv)

if (program.analyse) {
  require('../lib/cli')
}

if(program.serve) {
  const gulp = require('gulp')
  const tasks = require('../gulpfile.js')
  gulp.start('serve')
}



//require('../index.js')
