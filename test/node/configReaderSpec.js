var configReader = require('../../scripts/configReader');

describe('ConfigReader Specs', function () {

  it('should read configuration file', function () {
    var config = configReader.read('app/scripts/config.js');
    expect(config).toBeDefined();
    expect(config.categories.length).toBe(5);
  });
});
