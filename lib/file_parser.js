module.exports = {
  isJSX,
  parse,
  extractModule
}

function isJSX(file) {
  const firstLine = file.split('\n')[0]
  const module = extractModule(firstLine)

  return module && module.indexOf('react') > -1
}

function parse(file, whitelist = []) {
  return file.split('\n').reduce((modules, line) => {
    const module = extractModule(line)

    if(module) {
      isAllowed(whitelist) && modules.push(module)
    }

    return modules
  }, [])
}

function isAllowed(whitelist = []) {
  if(whitelist.length === 0) {
    return true
  }

  return whitelist.some(item => module.indexOf(item) > -1)
}

function extractModule(modulePath) {
 const result = modulePath.match(/(?:import)\s(.+)(?:from)\s['|"](.*)['|"];?/)

  if(!result) return false

  return result.pop()
}



