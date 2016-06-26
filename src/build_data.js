const fileParser = require('./file_parser.js')
const analyser = require('./analyser.js')

module.exports = {
  analyse
}

function analyse(file) {
  if(fileParser.isJSX(file)) {
    const modules = fileParser.parse(file)
    analyser.compute(file, modules)
  }

  return analyser.results()
}
