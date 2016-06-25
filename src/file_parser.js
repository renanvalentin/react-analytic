module.exports = {
  parse,
  extractModule
}

function parse(file) {
  return file.split('\n').reduce((modules, line) => {
    const module = extractModule(line)

    if(module)
      modules.push(module)

    return modules
  }, [])
}

function extractModule(modulePath) {
 const result = modulePath.match(/(?:import)\s(.+)(?:from)\s['|"](.*)['|"];?/)

  if(!result) return false

  return result.pop()
}



