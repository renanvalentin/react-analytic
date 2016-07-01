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
        nodes: [
          {
            id: 'module/a/b',
            name: 'module/a/b'
          },
          {
            id: 'path/to/ModuleA',
            name: 'path/to/ModuleA'
          },
          {
            id: 'path/to/ModuleB',
            name: 'path/to/ModuleB'
          }
        ],
        links: [
          {
            source: 'module/a/b',
            target: 'path/to/ModuleA'
          },
          {
            source: 'module/a/b',
            target: 'path/to/ModuleB'
          }
        ]
      })
  })
})
