'use strict';

describe('Directive: stage', function () {

  // load the directive's module
  beforeEach(module('angularTetrisApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stage></stage>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stage directive');
  }));
});
