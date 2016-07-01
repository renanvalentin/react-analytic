const graph = require('./graph')

const xhr = new XMLHttpRequest()
xhr.open('GET', 'data.json')
xhr.onload = () => {
  const graphic = graph.create(JSON.parse(xhr.response))
  console.log(graphic)
}

xhr.send()

function setup() {

}

function draw() {
  ellipse(50, 50, 50, 50)
}
