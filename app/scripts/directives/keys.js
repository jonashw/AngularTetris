'use strict';

angular.module('angularTetrisApp')
.directive('keys', ['$document',function ($document) {
	return {
		template: '<div></div>',
		restrict: 'E',
		scope:{
			moveLeft:'=',
			moveDown:'=',
			rotateCw:'=',
			rotateCcw:'=',
			moveRight:'=',
			drop:'=',
			playPause:'='
		},
		link: function (scope, element, attrs) {
			element.css('display','block');
			function update(keycode){
				element.text('last pressed keycode: ' + keycode);
			}
			update('');
			var mappings = {
				'39':'moveRight',//right
				'37':'moveLeft',//left
				'40':'moveDown',//down
				'17':'rotateCw',//Ctrl
				'96':'rotateCcw',//0 (on Num Pad)
				'80':'playPause',//p
				'32':'drop'//space
			};
			$document.bind('keydown',function(e){
				update(e.which);
				if(e.which in mappings){
					scope[mappings[e.which]]();
					e.preventDefault();
				}
			});
		}
	};
}]);
