'use strict';

angular.module('angularTetrisApp')
.directive('keys', ['$document',function ($document) {
	return {
		template: '<div></div>',
		restrict: 'E',
		scope:{
			moveLeft:'=',
			moveUp:'=',
			moveDown:'=',
			rotate:'=',
			moveRight:'='
		},
		link: function (scope, element, attrs) {
			element.css('display','block');
			function update(keycode){
				element.text('last pressed keycode: ' + keycode);
			}
			update('');
			$document.bind('keydown',function(e){
				update(e.which);
				switch(e.which){
					case 39://right
						scope.moveRight();
						e.preventDefault();
					break;
					case 37://left
						scope.moveLeft();
						e.preventDefault();
					break;
					case 38://up
						scope.moveUp();
						e.preventDefault();
					break;
					case 40://down
						scope.moveDown();
						e.preventDefault();
					break;
					case 17://Ctrl
						scope.rotate();
						e.preventDefault();
					break;
				}
			});
		}
	};
}]);
