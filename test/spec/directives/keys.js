'use strict';

describe('Directive: keys', function () {

  // load the directive's module
  beforeEach(module('angularTetrisApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<keys></keys>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the keys directive');
  }));
});
