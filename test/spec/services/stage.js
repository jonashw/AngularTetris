'use strict';

describe('Service: Stage', function () {

  // load the service's module
  beforeEach(module('angularTetrisApp'));

  // instantiate service
  var Stage;
  beforeEach(inject(function (_Stage_) {
    Stage = _Stage_;
  }));

  it('should do something', function () {
    expect(!!Stage).toBe(true);
  });

});
