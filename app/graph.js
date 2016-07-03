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

  let group = key.split('/')
  group.pop()

  tree.nodes.push({
    id: key,
    name: key,
    references: node.references.length,
    group: group.join('/')
  })

  const links = node.dependencies.map(dep => ({
    source: key,
    target: dep
  }))

  tree.links = tree.links.concat(links)

  return tree
}
