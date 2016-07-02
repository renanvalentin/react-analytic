const fileParser = require('../src/file_parser.js')

describe('File Parser', () => {
  it('should get a list of modules from the file', () => {
    const file = [
      'import ModuleA from \'path/to/ModuleA\'',
      'import ModuleA from \'path/to/ModuleB\'',
      'import ModuleA from \'path/to/ModuleC\'',
      '',
      '// some js...'
    ].join('\n')

    const modules = fileParser.parse(file)
    modules.should.eql([
      'path/to/ModuleA',
      'path/to/ModuleB',
      'path/to/ModuleC'
    ])
  })

  it('should exclude modules passed to parse', () => {
    const file = [
      'import React from \'react\'',
      'import redux from \'react-redux\'',
      'import ModuleA from \'path/to/ModuleA\'',
      '',
      '// some js...'
    ].join('\n')

    const excludeModules = [
      'react',
      'react-redux'
    ]

    const modules = fileParser.parse(file, excludeModules)
    modules.should.eql([
      'path/to/ModuleA'
    ])
  })

  it('should extract the path from the imported module', () => {
     const module = 'import Component from \'path/to/Component\''
     const path = fileParser.extractModule(module)

     path.should.equal('path/to/Component')
  })
})
