'use strict';

describe('Test Percentage Filter', function () {
  var percentage;
  beforeEach(function() {
    module('nihongo');
    inject(['percentageFilter', function (_percentageFilter_) {
      percentage = _percentageFilter_;
    }]);
  });

  it('Test some values', function () {
    expect(percentage(0.5, 2)).toBe('50.00%');
    expect(percentage(0.01234, 2)).toBe('1.23%');
  });
});
