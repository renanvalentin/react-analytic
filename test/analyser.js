const analyser = require('../src/analyser.js')

describe('Analyser', () => {
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
})
