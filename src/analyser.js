module.exports = {
  compute
}

let tree = {}

function compute(entry, modules) {
  initNode(entry)
  tree[entry].dependencies = modules

  modules.forEach(module => {
    initNode(module)
    setReference(module, entry)
  })

  return tree
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
