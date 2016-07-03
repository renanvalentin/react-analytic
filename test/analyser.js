const analyser = require('../src/analyser.js')

describe('Analyser', () => {
  beforeEach(() => {
    analyser.erase()
  })

  it('should compute component depencies', () => {
    const entry = 'module/a/b'

    const modules = [
      'path/to/ModuleA',
      'path/to/ModuleB'
    ]

    const computed = analyser.compute(entry, modules)

    computed.should.eql({
      'module/a/b': {
        dependencies: modules,
        references: []
      },
      'path/to/ModuleA': {
        dependencies: [],
        references: [entry]
      },
      'path/to/ModuleB': {
        dependencies: [],
        references: [entry]
      }
    })
  })

  it('should normalizer components names', () => {
    const entry = 'module/a/b.js'

    const modules = [
      './ModuleA'
    ]

    const computed = analyser.compute(entry, modules)

    computed.should.eql({
      'module/a/b': {
        dependencies: ['module/a/ModuleA'],
        references: []
      },
      'module/a/ModuleA': {
        dependencies: [],
        references: ['module/a/b']
      }
    })
  })
})
