module.exports = {
  compute,
  results,
  erase
}

var tree = {}
function compute(entry, modules, file) {
  const moduleName = sanitizeModuleName(entry)
  initNode(moduleName)

  modules.forEach(module => {
    const referenceName = sanitizeModuleName(resolvesRelativePath(module, moduleName))
    initNode(referenceName)
    setReference(referenceName, moduleName)

    tree[moduleName].dependencies.push(referenceName)
  })

  return tree
}

function sanitizeModuleName(name, parent) {
  return name.replace(/\..+$/, '')
}

function resolvesRelativePath(name, parent) {
  if(name.startsWith('./') && parent) {
    let paths = parent.split('/')
    paths.pop()

    const path = paths.join('/')

    return path + '/' + name.replace('./', '')
  }

  return name
}

function initNode(module) {
  if(!tree[module]) {
    tree[module] = {
      references: [],
      dependencies: []
    }
  }
}

function setReference(module, reference) {
  if(tree[module].references.indexOf(reference) === -1) {
    tree[module].references.push(reference)
  }
}

function results() {
  return tree;
}

function erase() {
  tree = {}
}
