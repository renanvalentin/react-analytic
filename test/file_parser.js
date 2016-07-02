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

    const whitelist  = [
      'path/to/'
    ]

    const modules = fileParser.parse(file, whitelist)
    modules.should.eql([
      'path/to/ModuleA',
      'path/to/ModuleB',
      'path/to/ModuleC'
    ])
  })

  it('should add only the modules from the whitelist', () => {
    const file = [
      'import React from \'react\'',
      'import redux from \'react-redux\'',
      'import ModuleA from \'path/to/ModuleA\'',
      '',
      '// some js...'
    ].join('\n')

    const whitelist  = [
      'path/to/'
    ]

    const modules = fileParser.parse(file, whitelist)
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
