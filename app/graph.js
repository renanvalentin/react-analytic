module.exports = {
  create
}

function create(state) {
 return Object.keys(state).reduce((tree, key) => createCoords(state, key, tree), {})
}

function createCoords(state, key, tree) {
  const node = state[key]

  const leaves = Object.keys(tree).length
  const size = calculateSpatialDistribuition(node)

  tree[key] = {
    x: calculateCoords(node) + leaves,
    y: calculateCoords(node) + leaves,
    size: size,
    dependencies: node.dependencies.slice(),
    references: node.references.slice()
  }

  return tree
}

function calculateSpatialDistribuition(node) {
  const minimunRequired = 1
  const references = node.references.length + minimunRequired
  const dependencies = node.dependencies.length + minimunRequired

  return (references * dependencies) / dependencies
}

function calculateCoords(node) {
  const minimunRequired = 1
  const references = node.references.length + minimunRequired
  const dependencies = node.dependencies.length + minimunRequired

  return references * dependencies
}
