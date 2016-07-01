(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./graph":1}]},{},[2]);
