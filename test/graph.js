const graph = require('../app/graph.js')

describe('Graph', () => {
  it('should generate points map', () => {
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
        x: 0,
        y: 0,
        size: 10,
        dependencies: ['path/to/ModuleA', 'path/to/ModuleB'],
        references: []
      },
      'path/to/ModuleA': {
        x: 11,
        y: 11,
        size: 11,
        dependencies: [],
        references: ['module/a/b']
      },
      'path/to/ModuleB': {
        x: 22,
        y: 22,
        size: 11,
        dependencies: [],
        references: ['module/a/b']
      }
    })
  })
})
