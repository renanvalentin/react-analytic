module.exports = {
  create
}

function create(state) {
 return Object.keys(state).reduce((tree, key) => createCoords(state, key, tree), {})
}

function createCoords(state, key, tree) {
  const node = state[key]

  const leaves = Object.keys(tree).length

  const minimumSize = 10
  const size = minimumSize + node.references.length

  tree[key] = {
    x: leaves * size,
    y: leaves * size,
    size: size,
    dependencies: node.dependencies.slice(),
    references: node.references.slice()
  }

  return tree
}

function calculateSpatialDistribuition(node) {
  const references = node.references.length
  const dependencies = node.dependencies.length

  return (references * dependencies) / dependencies
}

function calculateCoords(node) {
  const references = node.references.length
  const dependencies = node.dependencies.length

  return references * dependencies
}
