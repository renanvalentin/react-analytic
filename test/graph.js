const graph = require('../app/graph.js')

describe('Graph', () => {
  it.only('should generate points map', () => {
    const state = {
      'module/a/b': {
        dependencies: ['path/to/ModuleA', 'path/to/ModuleB'],
        references: []
      },
      'path/to/ModuleA': {
        dependencies: [],
        references: ['module/a/b']
      },
      'path/to/ModuleB': {
        dependencies: [],
        references: ['module/a/b']
      }
    }

    const graphic = graph.create(state)

    graphic.should.eql({
      'module/a/b': {
        x: 3,
        y: 3,
        size: 1,
        dependencies: ['path/to/ModuleA', 'path/to/ModuleB'],
        references: []
      },
      'path/to/ModuleA': {
        x: 3,
        y: 3,
        size: 2,
        dependencies: [],
        references: ['module/a/b']
      },
      'path/to/ModuleB': {
        x: 4,
        y: 4,
        size: 2,
        dependencies: [],
        references: ['module/a/b']
      }
    })
  })
})
