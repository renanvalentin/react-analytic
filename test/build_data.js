const proxyquire = require('proxyquire')
const sinon = require('sinon')

describe('Build Data', () => {
  it('should get a list of modules from the file', () => {
    const modules = [
      'import ModuleA from \'path/to/ModuleA\''
    ]

    const expectedResult = {}

    const isJSXStub = sinon.stub().returns(true)
    const parseStub = sinon.stub().returns(modules)
    const computeStub = sinon.stub()
    const resultsStub = sinon.stub().returns(expectedResult)

    const buildData = proxyquire('../src/build_data', {
      './file_parser.js': {
        isJSX: isJSXStub,
        parse: parseStub
      },
      './analyser.js': {
        compute: computeStub,
        results: resultsStub
      }
    })

    const path = '../path/to/file';

    const file = [
      'import ModuleA from \'path/to/ModuleA\'',
      'import ModuleA from \'path/to/ModuleB\'',
      'import ModuleA from \'path/to/ModuleC\'',
      '',
      '// some js...'
    ].join('\n')

    const result = buildData.analyse(path, file)

    parseStub.should.have.been.calledWith(file)
    computeStub.should.have.been.calledWith(path, modules)
    resultsStub.should.have.been.called

    result.should.eql(expectedResult)
  })
})
