(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
const graphics = require('./graph')

const xhr = new XMLHttpRequest()
xhr.open('GET', 'data.json')
xhr.onload = () => {
  var graph = graphics.create(JSON.parse(xhr.response))

var width = window.innerWidth,
    height = window.innerHeight;

  var countExtent = d3.extent(graph.nodes, d => d.references)
  var circleRadius = d3.scale.sqrt().range([3, 32]).domain(countExtent)

  graph.nodes.forEach(n => {
    n.x = Math.floor(Math.random() * width)
    n.y = Math.floor(Math.random() * height)
    n.radius = circleRadius(n.references)
  });

var force = d3.layout.force()
    .charge(-1050)
    .linkDistance(50)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .call(d3.behavior.zoom().on('zoom', () => {
      svg.attr('transform', 'translate(' + d3.event.translate + ') scale(' + d3.event.scale + ')')
    }))
    .append('g')

var color = d3.scale.category20()

  var nodeById = d3.map();

  graph.nodes.forEach(function(node) {
    nodeById.set(node.id, node);
  });

  graph.links.forEach(function(link) {
    link.source = nodeById.get(link.source);
    link.target = nodeById.get(link.target);
  });

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", (d) => d.radius)
      .style("fill", d => color(d.group))
      .call(force.drag);

  node.append("title")
    .text(d => d.name)

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });



}


xhr.send()



function setup() {

}

function draw() {
  ellipse(50, 50, 50, 50)
}

},{"./graph":1}]},{},[2]);
