const graph = require('../app/graph.js')

describe('Graph', () => {
  it('should link dependencies', () => {
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
            name: 'module/a/b',
            references: 0,
            group: 'module/a'
          },
          {
            id: 'path/to/ModuleA',
            name: 'path/to/ModuleA',
            references: 1,
            group: 'path/to'
          },
          {
            id: 'path/to/ModuleB',
            name: 'path/to/ModuleB',
            references: 1,
            group: 'path/to'
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
