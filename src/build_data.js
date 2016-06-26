const fileParser = require('./file_parser.js')
const analyser = require('./analyser.js')

module.exports = {
  analyse,
  results
}

function analyse(fileName, file) {
  if(fileParser.isJSX(file)) {
    const modules = fileParser.parse(file)
    analyser.compute(fileName, modules)
  }

  return analyser.results()
}

function results() {
  return analyser.results()
}
