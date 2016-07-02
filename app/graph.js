module.exports = {
  create
}

let tree = {
  nodes: [],
  links: []
}

function create(state) {
 return Object.keys(state).reduce((tree, key) => createCoords(state, key), {})
}

function createCoords(state, key) {
  const node = state[key]

  tree.nodes.push({
    id: key,
    name: key,
    references: node.references.length
  })

  const links = node.dependencies.map(dep => ({
    source: key,
    target: dep
  }))

  tree.links = tree.links.concat(links)

  return tree
}
