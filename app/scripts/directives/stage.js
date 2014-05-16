'use strict';

angular.module('angularTetrisApp')
.directive('stage', ['Stage',function (Stage) {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {
			element.replaceWith(Stage.element);
		},
		template: ''
	};
}]);
