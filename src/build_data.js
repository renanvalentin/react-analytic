const fileParser = require('./file_parser.js')
const analyser = require('./analyser.js')

module.exports = {
  analyse,
  results
}

function analyse(fileName, file, whitelist = []) {
  if(fileParser.isJSX(file)) {
    const modules = fileParser.parse(file, whitelist)
    analyser.compute(fileName, modules, file)
  }

  return analyser.results()
}

function results() {
  return analyser.results()
}
