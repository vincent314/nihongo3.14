configReader = require('../../scripts/configReader')

describe 'ConfigReader Specs', ->

  it 'should read configuration file', ->
    config = configReader.read 'app/scripts/config.js'
    expect(config).toBeDefined()
    expect(config.categories.length).toBe 5
