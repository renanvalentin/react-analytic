const fileParser = require('./file_parser.js')
const analyser = require('./analyser.js')

module.exports = {
  analyse,
  results
}

function analyse(fileName, file, excludeModules = []) {
  if(fileParser.isJSX(file)) {
    const modules = fileParser.parse(file, excludeModules)
    analyser.compute(fileName, modules)
  }

  return analyser.results()
}

function results() {
  return analyser.results()
}
