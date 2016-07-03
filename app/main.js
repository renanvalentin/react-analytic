const graphics = require('./graph')
const network = require('./network')

const xhr = new XMLHttpRequest()
xhr.open('GET', 'data.json')
xhr.onload = () => {
  var graph = graphics.create(JSON.parse(xhr.response))
  network.create(graph)
}

xhr.send()

